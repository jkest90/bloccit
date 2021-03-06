'use strict';
module.exports = (sequelize, DataTypes) => {
   var Topic = sequelize.define('Topic', {
      title: {
         type: DataTypes.STRING,
         allowNull: false
      },
      description: {
         type: DataTypes.STRING,
         allowNUll: false
      }
   }, {});

   Topic.associate = function(models) {
      // associations can be defined here
      Topic.hasMany(models.Banner, {
         foreignKey: "topicId",
         as: "banners",
      });
      Topic.hasMany(models.Post, {
         foreignKey: "topicId",
         as: "posts"
      });
      Topic.hasMany(models.Flair, {
         foreignKey: "topicId",
         as: "flairs"
      })
   };
   return Topic;
};
