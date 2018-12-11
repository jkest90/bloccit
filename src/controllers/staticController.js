module.exports = {
   // route handlers for routes/static.js
   index(req, res, next) {
      res.render('static/index', {title: 'Welcome to Bloccit!'});
   },

   aboutPage(req, res, next) {
      res.render('static/aboutPage', {title: 'About Us.'});
   }
}
