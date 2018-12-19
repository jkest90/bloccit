const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController")

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.get("/topics/:id", topicController.show);
router.get("/topics/:id/edit", topicController.edit);
// redirects to /topics/:id on success
router.post("/topics/create", topicController.create);
router.post("/topics/:id/destroy", topicController.destroy);
// redirecs to /topics/:id on success
router.post("/topics/:id/update", topicController.update);

module.exports = router;
