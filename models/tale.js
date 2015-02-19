"use strict";

module.exports = function(sequelize, DataTypes) {
  var tale = sequelize.define("tale", {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    files: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return tale;
};
