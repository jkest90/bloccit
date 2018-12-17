const topicQueries = require("../db/queries.topics.js");


module.exports = {
   index(req, res, next) {
      topicQueries.getAllTopics((err, topics) => {
         if (err) {
            res.redirect(500, "static/index");
         } else {
            res.render("topics/index", { topics });
         }
      })
   },
   new(req, res, next) {
      res.render("topics/new");
   },
   // create action grabs the vales of the form from the body property of the request & assigns them to a JS object.
   // call addTopic methjod & add pass the object as an argument.
   create(req, res, next) {
      let newTopic = {
         title: req.body.title,
         description: req.body.description
      };
      topicQueries.addTopic(newTopic, (err, topic) => {
         if (err) {
            console.log("ERROR:", err);
            console.log("BODY:", req.body);
            res.redirect(500, "/topics/new")
         } else {
            res.redirect(303, `/topics/${topic.id}`);
         }
      });
   }
}
