'use strict';

/**
 * Dependencies
 */

const express = require('express');
const cors = require('cors');
const app = express();
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  })
  .catch(error => handleError(error));

/**
 * Routes
 */

app.get('/location', routeLocation);
// app.get('/weather', getWeather);
// app.get('/events', getEvents);
app.use('*', wildcardRouter);

/**
 * Routers
 */

function routeLocation(request, response) {
  let queryStr = request.query.data;

  const location = locationFromDb(queryStr);
  if (!location) {
    location = newLocation(queryStr);
  }
  const location = newLocation(queryStr, response);
  response.status(200).send(location);
}

function locationFromDb(queryStr, response) {
  let sql = 'SELECT * FROM locations WHERE search_query = $1;';
  queryStr = queryStr.toUpperCase();
  let values = [queryStr];
  console.log('Sql: ', sql);
  console.log('Values: ', values);
  client
    .query(sql)
    .then(pgResults => {
      console.log('===========================');
      console.log('Row Count', pgResults.rowCount);
      if (pgResults.rowCount !== 0) {
        console.log('first row:', pgResults.row[0]);
      };

      if (pgResults.rowCount === 0) {
        return;
      } else {
        const row = pgResults.row[0];
        return new Location(row.search_query, row.formatted_query, row.latitude row.longitude);
      }

    })
    .catch(err => handleError(err, response));
}

function newLocation(searchQuery, response) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${process.env.GEOCODE_API_KEY}`;

  superagent
    .get(url)
    .then(result => {
      const locationData = result.body.results[0];
      const location = new Location(searchQuery, locationData);

      const sql = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
      const value = [location.search_query, location.formatted_query, location.latitude, location.longitude];

      client
        .query(sql, value)
        .then(response.status(200).send(location))
        .catch(error => handleError(error, response));
    })
}

function Location(searchQuery, locationData) {
  this.search_query = searchQuery;
  this.formatted_query = locationData.formatted_address;
  this.latitude = locationData.geometry.location.lat;
  this.longitude = locationData.geometry.location.lng;
}

function getWeather(request, response) {
  const searchQuery = request.query.data;
  const latitude = searchQuery.latitude;
  const longitude = searchQuery.longitude;
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;

  superagent.get(url)
    .then(data => {
      const body = data.body;
      const forecast = new Forecast(searchQuery, body);

      response.status(200).send(forecast.days);
    })
    .catch(err => handleError(err, response));
}

function Forecast(searchQuery, weatherDataResults) {
  const result = weatherDataResults.daily.data.map(day => {
    const obj = {};
    obj.forecast = day.summary;

    const date = new Date(0);
    date.setUTCSeconds(day.time);
    obj.time = date.toDateString();

    return obj;
  });

  this.days = result;
}

function getEvents(request, response) {
  const searchQuery = request.query.data;
  const latitude = searchQuery.latitude;
  const longitude = searchQuery.longitude;
  const url = `https://www.eventbriteapi.com/v3/events/search?location.longitude=${longitude}&location.latitude=${latitude}74&expand=venue&token=${process.env.EVENTBRITE_PUBLIC_TOKEN}`;

  superagent.get(url)
    .then(data => {
      const events = data.body.events.map(obj => new Event(obj));
      response.status(200).send(events);
    })
    .catch(err => handleError(err, response));
}

function Event(obj) {
  this.link = obj.url;
  this.name = obj.name.text;
  this.event_date = obj.start.local;
  this.summary = obj.summary;
}

function wildcardRouter(request, response) {
  response.status(500).send('Sorry, something went wrong');
}

/**
 * Helper Objects and Functions
 */

function Error(err) {
  this.status = 500;
  this.responseText = 'Sorry, something went wrong. ' + JSON.stringify(err);
  this.error = err;
}

function handleError(err, response) {
  console.log('ERRORE MESSAGE TO FOLOOOWWWWW');
  console.error(err);
  console.log('ERRORE MESSAGE ENDDDDSSSSS');
  const error = new Error(err);
  if (response) {
    response.status(error.status).send(error.responseText);
  }
}

