"use strict";

module.exports = function(sequelize, DataTypes) {
  var file = sequelize.define("file", {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        file.belongsTo(models.User);
      }
    }
  });

  return file;
};
