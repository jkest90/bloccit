const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("routes : topics", () => {

   describe("GET /topics", () => {

      beforeEach((done) => {
         this.topic;
         sequelize.sync({ force: true}).then((res) => {
            Topic.create({
               title: "JS Frameworks",
               description: "There is a lot of them"
            })
            .then((topic) => {
               this.topic = topic;
               done();
            })
            .catch((err) => {
               console.log(err);
               done();
            });
         });
      });

      it("should return a status code 200 and all topics", (done) => {
         request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("Topics");
            expect(body).toContain("JS Frameworks");
            done();
         });
      });
   });

   describe("Get /topics/new", () => {

      it("should render a new topic form", (done) => {
         request.get(`${base}new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Topic");
            console.log("BODY:", body);
            done();
         });
      });
   });

   describe("POST /topics/create", () => {
      const options = {
         url: `${base}create`,
         form: {
            title: "blink-182 songs",
            description: "What's your favorite blink-182 song?"
         }
      };

      it("should create a new topic and redirect", (done) => {

         request.post(options,
            // post method takes two arguments.
            // #1: options object with keys for the url to use for the req & form value to submit along with the body of the req.
            // #2: callback used to set expectations. grab topicId from the body and perform a search on topic table for newly created topic.
            (err, res, body) => {
               Topic.findOne({ where: { title: "blink-182 songs"}})
               .then((topic) => {
                  console.log(topic);
                  expect(res.statusCode).toBe(303);
                  expect(topic.title).toBe("blink-182 songs");
                  expect(topic.description).toBe("What's your favorite blink-182 song?");
                  done();
               })
               .catch((err) => {
                  console.log(err);
                  done();
               });
            })
         }
      );
   });
});
