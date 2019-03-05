const User = require("./models").User;
const Post = require("./models").Post;
const Comment = require("./models").Comment;
const bcrypt = require("bcryptjs");

module.exports = {

   createUser(newUser, callback) {

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);

      return User.create({
         email: newUser.email,
         password: hashedPassword
      })
      .then((user) => {
         callback(null, user);
      })
      .catch((err) => {
         console.log(err);
         callback(err);
      })

   },

   getUser(id, callback) {
      // result object holds the user, posts, and comments we will return and request the User object from the db.
      let result = {};

      User.findById(id)
      .then((user) => {

         if (!user) {
            callback(404);
         } else {
            // store retunred users in "users" propert of result object.
            result["user"] = user;

            Post.scope({ method: ["lastFiveFor", id] }).all()
            .then((posts) => {
               // store returned posts in "posts" property of result object.
               result["posts"] = posts;

               Comment.scope({ method: ["lastFiveFor", id] }).all()
               .then((comments) => {
                  // store returned comments in "comments" property of results object.
                  result["comments"] = comments;
                  // render "users/show" view with our new results object.
                  callback(null, result);

               })
               .catch((err) => {
                  callback(err);
               });
            });
         }

      });
   }

}
