// Perform CRUD method directly on our Sequelize models using promises.
const Topic = require('./models').Topic;

module.exports = {

// #1. Return result of calling .all() on topic model.
   getAllTopics(callback) {
      return Topic.all()
// #2. Once all topics return successfully, call callback we passed into getAllTopics, defined in the controller and pass it null & our topics.
//     This will be a function in our controller that renders view according to what is passed to callback.
      .then((topics) => {
         callback(null, topics);
      })
      .catch((err) => {
         callback(err);
      })
   }
}
