"use strict";

module.exports = function(sequelize, DataTypes) {
  var Trip = sequelize.define("Trip", {
    title: DataTypes.STRING,
    date_of_creation: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Trip;
};
