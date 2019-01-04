const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController");

// show all ads
router.get("/advertisement", adController.index);
// show new ad form
router.get("/advertisement/new", adController.new);
// post new ad to database
router.post("/advertisement/create", adController.create);
// show individual ad based on id
router.get("/advertisement/:id", adController.show);
// delete individual ad based on id
router.post("/advertisement/:id/destroy", adController.destroy);
// show screen to edit an individual ad
router.get("/advertisement/:id/edit", adController.edit);
// update database with newly changed ad
router.post("/advertisement/:id/update", adController.update);

module.exports = router;
