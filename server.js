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

  const location = getLocation(queryStr, response);
  // response.status(200).send(location);
}

function getLocation(queryStr, response) {
  let sql = 'SELECT * FROM locations;';
  let value = [queryStr];
  console.log('BROKENNNNNNNNN');
  client
    .query(sql, value)
    .then(pgResults => {
      console.log('====================================================================================================================================================================================');
      console.log('our pgResults', pgResults);
      // response.status(200).json(pgResults);
    })
    .catch(err => handleError(err));
}

function googleLocation(queryStr, response){
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryStr}&key=${process.env.GEOCODE_API_KEY}`;

  superagent.get(url)
    .then(saResult => {
      const body = saResult.body;
      const location = new Location(queryStr, body);
      response.status(200).send(location);
    })
    .catch(err => handleError(err, response));
}

function Location(searchQuery, geoDataResults) {
  const results = geoDataResults.results[0];

  this.search_query = searchQuery;
  this.formatted_query = results.formatted_address;
  this.latitude = results.geometry.location.lat;
  this.longitude = results.geometry.location.lng;
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
  console.log('ERRORE MESSAGE TO FOLOOOWWWWW')
  console.error(err);
  console.log('ERRORE MESSAGE ENDDDDSSSSS')
  const error = new Error(err);
  response.status(error.status).send(error.responseText);
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`))
  })
  .catch(error => handleError(error));
