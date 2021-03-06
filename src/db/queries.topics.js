const Topic = require("./models").Topic;
const Post = require("./models").Post;
const Flair = require("./models").Flair;
const Authorizer = require("../policies/topic");

module.exports = {

   getAllTopics(callback) {
      return Topic.all()
         .then((topics) => {
            callback(null, topics);
         })
         .catch((err) => {
            callback(err);
         })
   },

   addTopic(newTopic, callback) {
      return Topic.create({
            title: newTopic.title,
            description: newTopic.description
         })
         .then((topic) => {
            console.log(topic);
            callback(null, topic);
         })
         .catch((err) => {
            callback(err);
         })
   },

   getTopic(id, callback) {
      return Topic.findById(id, {
         include: [{
            model: Post,
            // Property name we want the returned Posts to be called when topic is returned.
            // Call topic.posts to get array of posts that belong to topic.
            as: "posts"
         }, {
            model: Flair,
            as: "flairs"
         }]
      })
      .then((topic) => {
         callback(null, topic)
      })
      .catch((err) => {
         callback(err);
      })
   },

   deleteTopic(req, callback) {
      console.log("topic query: deleting topic");
      return Topic.findById(req.params.id)
      .then((topic) => {
         const authorized = new Authorizer(req.user, topic).destroy();

         if (authorized) {
            console.log("topic query: user is authorized, deleting topic");
            topic.destroy()
            .then((res) => {
               console.log("topic query: deleted topic, executing callback");
               callback(null, topic);
            })
            .catch((err) => {
               console.log("topic query: topic.destroy threw an error");
               console.log(err);
               callback(err);
            });
         } else {
            console.log("topic query: user not authorized, executing callback with 401");
            req.flash("notice", "You are not authorized to do that.");
            callback(401);
         }
      })
      .catch((err) => {
         console.log("topic query: there was an error, returning it to callback:");
         console.log(err);
         callback(err);
      })
   },

   updateTopic(req, updatedTopic, callback){
      return Topic.findById(req.params.id)
      .then((topic) => {
         if (!topic) {
            return callback("Topic not found");
         }

         const authorized = new Authorizer(req.user, topic).update();
         if (authorized) {
            topic.update(updatedTopic, {
               fields: Object.keys(updatedTopic)
            })
            .then(() => {
               callback(null, topic);
            })
            .catch((err) => {
               callback(err);
            });
         } else {
            req.flash("notice", "You are not authorized to do that.");
            callback("Forbidden");
         }
      });
   }

}
