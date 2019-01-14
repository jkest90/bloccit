const request = require("request");
const server = require("../../src/server");
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

   beforeEach((done) => {
      this.topic;
      this.flair;
      sequelize.sync({
         force: true
      }).then((res) => {
         Topic.create({
            title: "Phish Summer Tour 2019",
            description: "A list of summer tour dates."
         })
         .then((topic) => {
            this.topic = topic;
            Flair.create({
               name: "Phish",
               color: "Blue",
               topicId: this.topic.id
            })
            .then((flair) => {
               this.flair = flair;
               done();
            });
         })
         .catch((err) => {
            console.log(err);
            done();
         });
      });
   });

   describe("#create()", () => {

      it("should create a flair with a name, color, and assigned topic", (done) => {
         Flair.create({
            name: "Widespread Panic",
            color: "Yellow",
            topicId: this.topic.id
         })
         .then((flair) => {
            expect(flair.name).toBe("Widespread Panic");
            expect(flair.color).toBe("Yellow");
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
      });

      it("should not create a flair without a name, color, and assigned topic", (done) => {
         Flair.create({
            name: "Widespread Panic"
         })
         .then((flair) => {
            done();
         })
         .catch((err) => {
            expect(err.message).toContain("Flair.color cannot be null");
            expect(err.message).toContain("Flair.topicId cannot be null");
            done();
         });
      });

   });

   describe("#setTopic()", () => {

      it("should associate a topic and a flair together", (done) => {
         Topic.create({
            title: "Alpine Valley",
            description: "How is the lawn?"
         })
         .then((newTopic) => {
            expect(this.flair.topicId).toBe(this.topic.id);

            this.flair.setTopic(newTopic)
            .then((flair) => {
               expect(flair.topicId).toBe(newTopic.id);
               done();
            });
         });
      });

   });

   describe("#getTopic()", () => {

      it("should return the associated topic", (done) => {
         this.flair.getTopic()
         .then((associatedTopic) => {
            expect(associatedTopic.title).toBe("Phish Summer Tour 2019");
            done();
         });
      });

   });

});
