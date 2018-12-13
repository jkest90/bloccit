const topicQueries = require('../db/queries.topics.js');

module.exports = {

   index(req, res, next) {
      topicQueries.getAllTopics((err, topics) => {
         if (err) {
            // if error redirect to landing page.
            res.redirect(500, 'static/index');
         } else {
            // else, render index template of topics resource & pass collections of topics into it. returns an array of objects.
            res.render('topics/index', {topics});
         }
      })
   }

}
