const express = require('express');
const app = express();


const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');

// initialize routes and app configuration
routeConfig.init(app);
appConfig.init(app, express);

module.exports = app;
