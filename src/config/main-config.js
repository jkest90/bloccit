require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');

module.exports = {
   // function to initialize our Express app:
   init(app, express) {
      // set path where templating engine will find views & set on Express app.
      app.set('views', viewsFolder);
      // mount EJS view engine.
      app.set('view engine', 'ejs');
      // tell express where to find static assets.
      app.use(express.static(path.join(__dirname, '..', 'assets')));
   }
};
