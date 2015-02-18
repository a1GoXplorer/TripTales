"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tale = sequelize.define("Tale", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    date_of_creation: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Tale;
};
