const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController");

// show new flair form
router.get("/topics/:topicId/flairs/new", flairController.new);
// post new flair to database
router.post("/topics/:topicId/flairs/create", flairController.create);
// redirect to show new flair page
router.get("/topics/:topicId/flairs/:id", flairController.show);
// delete flair
router.post("/topics/:topicId/flairs/:id/destroy", flairController.destroy);
// redirect to edit flair page
router.get("/topics/:topicId/flairs/:id/edit", flairController.edit); 
router.post("/topics/:topicId/flairs/:id/update", flairController.update);

module.exports = router;
