const Topic = require("./models").Topic;
const Post = require("./models").Post;

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
         }]
      })
      .then((topic) => {
         callback(null, topic)
      })
      .catch((err) => {
         callback(err);
      })
   },

   deleteTopic(id, callback) {
      return Topic.destroy({
         where: {id}
      })
      .then((topic) => {
         callback(null, topic);
      })
      .catch((err) => {
         callback(err);
      })
   },

   updateTopic(id, updatedTopic, callback) {
      return Topic.findById(id)
      .then((topic) => {
         if(!topic) {
            return callback("Topic not found");
         }

         topic.update(updatedTopic, {
            fields: Object.keys(updatedTopic)
         })
         .then(() => {
            callback(null, topic);
         })
         .catch((err) => {
            callback(err);
         });
      });
   }

}
