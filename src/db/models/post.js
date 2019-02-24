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
         where: { value: 1,
                  userId: userId
                  // postId: this.post.id
               }
         })
         .then((votes) => {
            if (votes.length !== 0) {
               return true;
            } else {
               return false;
            }
            // votes.length !== 0 ? true : false;
      });
      // if (this.vote.userId === userId && this.vote.value === 1) return true;

   }

   return Post;
};
