const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {

   init(app) {
      // initialize passport and tell it to use sessions to keep track of authenticated users.
      app.use(passport.initialize());
      app.use(passport.session());

      // instruct passport to use local strategy. change username field to the name "email".
      passport.use(new LocalStrategy({
         usernameField: "email"
      }, (email, password, done) => {
         User.findOne({
            where: { email }
         })
         .then((user) => {
            // if no user with provided email, or if provided password doesnt match the one stored in db, return error message.
            if(!user || !authHelper.comparePass(password, user.password)) {
               return done(null, false, { message: "Invalid email or password" });
            }
            // if fields are correct, return authenticated user.
            return done(null, user);
         })
      }));

      // takes the authenticated user's ID and stores it in the session.
      passport.serializeUser((user, callback) => {
         callback(null, user.id);
      });

      // takes the user's ID stored in the session and returns the user associated with it.
      passport.deserializeUser((id, callback) => {
         User.findById(id)
         .then((user) => {
            callback(null, user);
         })
         .catch((err) => {
            console.log(err);
            callback(err, user);
         })
      })
   }

}
