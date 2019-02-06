const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/topics/:topicId/posts/new", helper.ensureAuthenticated, postController.new); // member or admin
router.post("/topics/:topicId/posts/create", helper.ensureAuthenticated, validation.validatePosts, postController.create ); // member or admin
router.get("/topics/:topicId/posts/:id", postController.show); // all (guest, owner, & admin)
router.post("/topics/:topicId/posts/:id/destroy", helper.ensureAuthenticated, postController.destroy); // owner or admin
router.get("/topics/:topicId/posts/:id/edit", helper.ensureAuthenticated, postController.edit); // owner or admin
router.post("/topics/:topicId/posts/:id/update", helper.ensureAuthenticated, validation.validatePosts, postController.update); // owner or admin

module.exports = router;
