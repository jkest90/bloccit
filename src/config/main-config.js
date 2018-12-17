require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');
const bodyParser = require('body-parser');

module.exports = {
   // function to initialize our Express app:
   init(app, express) {
      // set path where templating engine will find views & set on Express app.
      app.set('views', viewsFolder);
      // mount EJS view engine.
      app.set('view engine', 'ejs');
      // configure body-parser for urlencoded bodies with extended: true - to send rich objects.
      app.use(bodyParser.urlencoded({ extended: true }));
      // tell express where to find static assets.
      app.use(express.static(path.join(__dirname, '..', 'assets')));
   }
};
