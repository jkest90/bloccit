const request = require("request");
const server = require("../../src/server");
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

   beforeEach((done) => {
     this.topic;
     this.post;
     this.user;

     sequelize.sync({force: true}).then((res) => {

       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user

         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",
           posts: [{
             title: "My first visit to Proxima Centauri b",
             body: "I saw some rocks.",
             userId: this.user.id
           }]
         }, {
           include: {
             model: Post,
             as: "posts"
           }
         })
         .then((topic) => {
           this.topic = topic; //store the topic
           this.post = topic.posts[0]; //store the post
           done();
         })
       })
     });
   });


   describe("#create()", () => {

      it("should create a topic with a title and description in our db", (done) => {
         Topic.create({
            title: "Favorite Band?",
            description: "The Dead."
         })
         .then((topic) => {
            expect(topic.title).toBe("Favorite Band?");
            expect(topic.description).toBe("The Dead.");
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
      });

      it("should not create a topic without a title and description", (done) => {
         Topic.create({
            description: "Favorite song?"
         })
         .then((topic) => {
            done();
         })
         .catch((err) => {
            expect(err.message).toContain("Topic.title cannot be null");
            done();
         });
      });

   });

   describe("#setTopic()", () => {

      it("should associate a topic and a post together", (done) => {

         Topic.create({
            title: "Camden",
            description: "Who's going to the Camden shows this summer?"
         })
         .then((newTopic) => {
            expect(this.post.topicId).toBe(this.topic.id);

            this.post.setTopic(newTopic)
            .then((post) => {
               expect(post.topicId).toBe(newTopic.id);
               done();
            });

         });

      });

   });

   describe("#getPost()", () => {

      it("should return all associated posts", (done) => {

         this.topic.getPosts()
         .then((associatedPosts) => {
            expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
            done();
         });

      });

   });

});
