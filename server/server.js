const express = require('express');
let app = express();

//body parsing middleware
app.use(express.json());

//routes
app.use('/api', require('./api'));

module.exports = app;