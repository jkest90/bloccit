const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/post");

module.exports = {

   new(req, res, next) {
      // member or admin
      const authorized = new Authorizer(req.user).newOrCreate();
      if (authorized) {
         res.render("posts/new", {topicId: req.params.topicId});
      } else {
         req.flash("notice", "You are not authorized to do that");
      }
   },

   create(req, res, next) {
      // member or admin
      const authorized = new Authorizer(req.user).newOrCreate();
      if (authorized) {
         let newPost = {
            title: req.body.title,
            body: req.body.body,
            topicId: req.params.topicId,
            userId: req.user.id
         };
         postQueries.addPost(newPost, (err, post) => {
            if (err) {
               res.redirect(500, "/posts/new");
            } else {
               res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
            }
         });
      }
   },

   show(req, res, next) {
      // all
      postQueries.getPost(req.params.id, (err, post) => {
         if (err || post == null)  {
            res.redirect(404, "/");
         } else {
            res.render("posts/show", {post});
         }
      });
   },

   destroy(req, res, next) {
      // owner or admin
      // why not authorize in this method?
      postQueries.deletePost(req, (err, post) => {
         if (err) {
            res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
         } else {
            res.redirect(303, `/topics/${req.params.topicId}`);
         }
      });
   },

   edit(req, res, next) {
      // owner or admin
      postQueries.getPost(req.params.id, (err, post) => {
         if (err || post == null) {
            res.redirect(404, "/");
         } else {
            const authorized = new Authorizer(req.user, post).modify();
            if (authorized) {
               res.render("posts/edit", {post});
            } else {
               req.flash("You are not authorized to do that.");
               res.redirect(`/topics/${req.params.topicId}`);
            }
         }
      });
   },


   update(req, res, next) {
      postQueries.updatePost(req, req.body, (err, post) => {
         if (err || post == null) {
            res.redirect(401, `/topics/${req.params.topicId}/posts/${req.params.id}/edit`);
         } else {
            res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
         }
      });
   }

}
