const express = require('express');
const app = express();


const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');

// initialize routes
routeConfig.init(app);
// initialize env variables stored in .env
appConfig.init();

module.exports = app;
