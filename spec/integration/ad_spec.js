const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";
const sequelize = require("../../src/db/models/index").sequelize;
const Ad = require("../../src/db/models").Advertisement;

describe ("routes : advertisements", () => {

   beforeEach((done) => {
      this.ad;
      sequelize.sync({force: true}).then((res) => {
         Ad.create({
            title: "Madison Square Garden",
            description: "PHISH: 12/28 - 12/31"
         })
         .then((ad) => {
            this.ad = ad;
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
      });
   });

   describe("GET /advertisements", () => {

      it("should return a status code 200 and all ads", (done) => {
         request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("Advertisements");
            expect(body).toContain("Madison Square Garden");
            done();
         });
      });
   });

   describe("GET /advertisement/new", () => {

      it("should render a new advertisement form", (done) => {
         request.get(`${base}new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Advertisement");
            done();
         });
      });
   });

   describe("POST /advertisement/create", () => {

      const options = {
         url: `${base}create`,
         form: {
            title: "The Mockingbird Foundation",
            description: "Donate today!"
         }
      };

      it("Should create a new ad and redirect", (done) => {

         request.post(options,
            (err, res, body) => {
               Ad.findOne({where: {title: "The Mockingbird Foundation"}})
               .then((ad) => {
                  expect(res.statusCode).toBe(303);
                  expect(ad.title).toBe("The Mockingbird Foundation");
                  expect(ad.description).toBe("Donate today!");
                  done();
               })
               .catch((err) => {
                  console.log(err);
                  done();
               });
            }
         );
      });

   });

   describe("GET /advertisement/:id", () => {

      it("should render a view with the selected ad", (done) => {
         request.get(`${base}${this.ad.id}`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Madison Square Garden");
            done();
         });
      });

   });

   describe("POST /advertisement/:id/destroy", () => {

      it("should delete the ad associated with the ID", (done) => {

         Ad.all()
         .then((ads) => {
            const adCountBeforeDelete = ads.length;
            expect(adCountBeforeDelete).toBe(1);

            request.post(`${base}${this.ad.id}/destroy`, (err, res, body) => {
               Ad.all()
               .then((ads) => {
                  expect(err).toBeNull();
                  expect(ads.length).toBe(adCountBeforeDelete - 1);
                  done();
               });
            });
         });

      });
   });

   describe("GET /topics/:id/edit", () => {

      it("should render a view with an edit topic form", (done) => {
         request.get(`${base}${this.ad.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Advertisement");
            expect(body).toContain("Madison Square Garden");
            done();
         });
      });

   });

   describe("POST /advertisement/:id/update", () => {

      it("should update the ad with the given values", (done) => {
         const options = {
            url: `${base}${this.ad.id}/update`,
            form: {
               title: "MSG",
               description: "PHISH 12/28 - 12/31"
            }
         };

         request.post(options,
            (err, res, body) => {
            expect(err).toBeNull();
            Ad.findOne({
               where: { id: this.ad.id }
            })
            .then((ad) => {
               expect(ad.title).toBe("MSG");
               done();
            });
         });
      });

   });

});
