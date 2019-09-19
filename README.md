# lab-07-back-end

# Project Name

**Authors**: Karina Chen, Ethan Davis, Jonathan Kimball
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
This application is called City Explorer, which allows users to come to the website and type in a location in anywhere without knowing the location's latitude and longitude. Then the website will return the current weather information of that location. If the location the user input is not found or if anything goes wrong on the website, the user will be notified the situation.  

## Getting Started
When users want to build this app on their own machine, they first go to our GitHub page and git clone the app to their local repo. Then in their local repo, create a file called .env and inside .env file, put the exact wording that is inside the single quotes 'PORT=3000' into the file. Then in their terminal, run npm -i. This will install all the dependencies with the same versions we use on our app that are also listed in the package.json file to their local machine so they can run our app.

## Architecture
In this app, we used JavaScript, Express, cors, and dotenv. Express is the library that lets us set up a server. Cors initializes our express server. It tells the browser it is ok to communicate with the domain that the js isn't running on and tells the browser that you want the client domain to be able to make server requests. Dotenv is the library that lets us talk to our .env file. 

## Change Log
09-17-2019 11:00am - Repository of app is set up with all the folder structure and files required. A GitHub repo is created and a collaborator is added to the repo. 

09-17-2019 11:25am - App is now successfully running on the express server and is deployed through Heroku. The app has the first feature 'Location', which has a route of /location and shows the location's search query, formatted address, latitude, and longitude.

09-17-2019 12:40am - The second feature 'Weather' of the app is now available and is deployed on Heroku. This feature allows the users to know the upcoming 8 days of weather conditions of the location they input.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

### Karina Chen, Jonathan Kimball

- Initial setup for Node.js and Express
- Code to respond to client requests for location and weather

### Ethan Davis, Jonathan Kimball

- Coding to use APIs
  - Google Geocode API
  - Darkskys Weather API
  - Enventbrite API

## Time estimates 9/17/19

Number and name of feature: #1 Repository Set Up

Estimate of time needed to complete: 1 hour

Start time: 9:40 AM

Finish time: 11:00 AM

Actual time needed to complete: 1 hour 20 minutes



Number and name of feature: #2 Locations

Estimate of time needed to complete: 1 hour

Start time: 11:00 AM

Finish time: 11:25 AM

Actual time needed to complete: 25 minutes



Number and name of feature: #3 Weather

Estimate of time needed to complete: 1 hour

Start time: 11:30 AM

Finish time: 12:40 PM

Actual time needed to complete: 1 hour 10 minutes



Number and name of feature: #4 Errors

Estimate of time needed to complete: 15 minutes

Start time: 1:25 PM

Finish time: 

Actual time needed to complete: 

## Time estimates 9/18/19

Number and name of feature: #01 Data formatting

Estimate of time needed to complete: 1:00 hours

Start time: Wed 9/18/19 10:00am

Wed 9/18/19
  - 10:00am - 10:30am

Finish time: Wed 9/18/19 10:30am

Actual time needed to complete: 0:30 hours

---

Number and name of feature: #02 Locations

Estimate of time needed to complete: 1:00 hours

Start time: Wed 9/18/19 10:30am

Wed 9/18/19
  - 10:30am - 11:30am

Finish time: Wed 9/18/19 11:30am

Actual time needed to complete: 1:00 hours

---

Number and name of feature: #03 Weather

Estimate of time needed to complete: 1:00 hours

Start time: Wed 9/18/19 1:00pm

Wed 9/18/19
  - 1:00pm - 1:30pm

Finish time: Wed 9/18/19 1:30pm

Actual time needed to complete: 0:30 hours

---

Number and name of feature: #04 EventBrite

Estimate of time needed to complete: 1:00 hours

Start time: Wed 9/18/19 6:30pm

Wed 9/18/19
  - 6:30pm - 7:00pm

Finish time: Wed 9/18/19 7:00pm

Actual time needed to complete: 0:30 hours
