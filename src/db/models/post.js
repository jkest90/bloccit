'use strict';
module.exports = (sequelize, DataTypes) => {
   var Post = sequelize.define('Post', {
      title: {
         type: DataTypes.STRING,
         allowNull: false
      },
      body: {
         type: DataTypes.STRING,
         allowNull: false
      },
      topicId: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   }, {});

   Post.associate = function(models) {
      Post.belongsTo(models.Topic, {
         foreignKey: "topicId",
         onDelete: "CASCADE"
      });

      Post.belongsTo(models.User, {
         foreignKey: "userId",
         onDelete: "CASCADE"
      });

      Post.hasMany(models.Comment, {
         foreignKey: "postId",
         as: "comments"
      });

      Post.hasMany(models.Vote, {
        foreignKey: "postId",
        as: "votes"
      });

      Post.hasMany(models.Favorite, {
         foreignKey: "postId",
         as: "favorites"
      });

      Post.afterCreate((post, callback) => {
         return models.Favorite.create({
            userId: post.userId,
            postId: post.id
         });
      });

   };

   Post.prototype.getPoints = function() {
      // If a post has votes, add them and return the result.
      // .map turns this.votes into an array of values.
      // .reduce goes over all value, reducing them until one is left, the total.

      if(this.votes.length === 0) return 0;

      return this.votes
         .map((v) => { return v.value })
         .reduce((prev, next) => { return prev + next });
   };

   Post.prototype.hasUpvoteFor = function(userId) {

      return this.getVotes({
         where: {
                  value: 1,
                  userId: userId,
                  postId: this.id
               }
         })
         .then((vote) => {
            return vote.length !== 0;
         });

   }

   Post.prototype.hasDownvoteFor = function(userId) {

      return this.getVotes({
         where: {
               value: -1,
               userId: userId,
               postId: this.id
            }
         })
         .then((vote) => {
            return vote.length !== 0;
         })

   };

   Post.prototype.getFavoriteFor = function(userId) {
      return this.favorites.find((favorite) => { return favorite.userId == userId });
   }

   return Post;
};
