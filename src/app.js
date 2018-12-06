const express = require('express');
const app = express();
const routeConfig = require('./config/route-config.js');

// initialize routes
routeConfig.init(app);

module.exports = app;
