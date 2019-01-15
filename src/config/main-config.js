require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");

module.exports = {
   // function to initialize our Express app:
   init(app, express) {
      // set path where templating engine will find views & set on Express app.
      app.set('views', viewsFolder);
      // mount EJS view engine.
      app.set('view engine', 'ejs');
      // configure body-parser for urlencoded bodies with extended: true - to send rich objects.
      app.use(bodyParser.urlencoded({ extended: true }));
      // mount express-validator middlewear to validate incoming data.
      app.use(expressValidator());
      // configure and mount express session middleweaer
      app.use(session({
         secret: process.env["cookieSecret"],
         resave: false,
         saveUninitialized: false,
         cookie: { maxAge: 60000 }
      }));
      // mount flash middlwear
      app.use(flash());
      // tell express where to find static assets.
      app.use(express.static(path.join(__dirname, '..', 'assets')));
   }
};
