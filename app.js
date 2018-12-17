// app.js

// BASE SETUP
// =============================================================================


// Global variables
// -----------------------------------------------------------------------------


// Requirements
// -----------------------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Create the app
// -----------------------------------------------------------------------------
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('www'))
app.use(express.static('frontend'))


// Authorize cross origin
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Load the API routes
const apiRoutes = require('./api/apiRoutes');
app.use('/api', apiRoutes);


// Exporting the app to be loaded on the server
module.exports = {
  app: app
};
