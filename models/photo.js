'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    author: DataTypes.TEXT,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Photo;
};