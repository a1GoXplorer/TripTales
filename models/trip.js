
"use strict";

module.exports = function(sequelize, DataTypes) {
  var trip = sequelize.define("trip", {
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return trip;
};

