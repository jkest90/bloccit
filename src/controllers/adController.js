// Tells us where to direct the response from the database request.
const adQueries = require("../db/queries.ads.js");

module.exports = {

   index(req, res, next) {
      adQueries.getAllAds((err, ads) => {
         if(err) {
            res.redirect(500, "static/index");
         } else {
            res.render("advertisements/index", { ads });
         }
      })
   },

   new(req, res, next) {
      res.render("advertisements/new");
   },

   create(req, res, next) {
      let newAd = {
         title: req.body.title,
         description: req.body.description
      };

      adQueries.addAd(newAd, (err, ad) => {
         if (err) {
            console.log(err);
            res.redirect(500, "/advertisement/new");
         } else {
            res.redirect(303, `/advertisement/${ad.id}`);
         }
      });
   },

   show(req, res, next) {
      adQueries.getAd(req.params.id, (err, ad) => {
         if (err || ad == null) {
            console.log(err);
            res.redirect(404, "/");
         } else {
            res.render("advertisements/show", {ad});
         }
      });
   },

   destroy(req, res, next) {
      adQueries.deleteAd(req.params.id, (err, ad) => {
         if (err) {
            console.log(err);
            res.redirect(500, `/advertisement/${ad.id}`);
         } else {
            res.redirect(303, "/advertisement");
         }
      });
   },

   edit(req, res, next) {
      adQueries.getAd(req.params.id, (err, ad) => {
         if (err || ad == null) {
            res.redirect(404, "/");
         } else {
            res.render("advertisements/edit", {ad});
         }
      });
   },

   update(req, res, next) {
      adQueries.updateAd(req.params.id, req.body, (err, ad) => {
         if (err || ad == null) {
            res.redirect(404, `/advertisement/${req.params.id}/edit`);
         } else {
            res.redirect(`/advertisement/${ad.id}`);
         }
      });
   }

}
