// Tells us where to direct the response from the database request.
const topicQueries = require("../db/queries.topics.js");
const Authorizer = require("../policies/topic");


module.exports = {
   index(req, res, next) {
      // getAllTopics() calls Topic.all() on our database. Then, if an error occurs, calls the callback function, passing into it "err". If (err) redirect to "static/index".
      // If it finds topics and no error, call getAllTopics callback with the "err" null and as the returned topics from Topic.all().
      topicQueries.getAllTopics((err, topics) => {
         // Once we return Topic.all(), call our callback function. If topics found arguments are (null, topics). If not pass in (err) to callback.
         if (err) {
            // callback(err)
            console.log(err);
            res.redirect(500, "static/index");
         } else {
            // callback(err, topics)
            res.render("topics/index", { topics });
         }
      })

      /* getAllTopics(callback) {
         return Topic.all()
            .then((topics) => {
               callback(null, topics);
            })
            .catch((err) => {
               callback(err);
            })
      */
   },

   new(req, res, next) {
      const authorized = new Authorizer(req.user).create();
      if (authorized) {
         res.render("topics/new");
      } else {
         req.flash("notice", "You are not authorized to do that.");
         res.redirect("/topics");
      }
   },

   create(req, res, next) {
   // create action grabs the vales of the form from the body property of the request & assigns them to a JS object.
   // call addTopic methjod & add pass the object as an argument.
      const authorized = new Authorizer(req.user).create();

      if (authorized) {
         let newTopic = {
            title: req.body.title,
            description: req.body.description
         };
         topicQueries.addTopic(newTopic, (err, topic) => {
            if(err) {
               res.redirect(500, "topics/new");
            } else {
               res.redirect(303, `/topics/${topic.id}`);
            }
         });
      } else {
         req.flash("notice", "You are not authorized to do that.");
         res.redirect("/topics");
      }
   },

   show(req, res, next) {
      topicQueries.getTopic(req.params.id, (err, topic) => {
         if (err || topic == null) {
            res.redirect(404, "/");
         } else {
            res.render("topics/show", {topic});
         }
      });
   },

   destroy(req, res, next) {
      topicQueries.deleteTopic(req, (err, topic) => {
         if (err) {
            res.redirect(err, `/topics/${req.params.id}`);
         } else {
            res.redirect(303, "/topics");
         }
      })
   },

   edit(req, res, next) {
      topicQueries.getTopic(req.params.id, (err, topic) => {
         if (err || topic == null) {
            res.redirect(404, "/");
         } else {
            const authorized = new Authorizer(req.user, topic).edit();
            if (authorized) {
               res.render("topics/edit", {topic});
            } else {
               req.flash("You are not authorized to do that.");
               res.redirect(`/topics/${req.params.id}`);
            }
         }
      })
   },

   update(req, res, next) {
      topicQueries.updateTopic(req, req.body, (err, topic) => {
         if (err || topic == null) {
            res.redirect(401, `/topics/${req.params.id}/edit`);
         } else {
            res.redirect(`/topics/${req.params.id}`);
         }
      });
   }

}
