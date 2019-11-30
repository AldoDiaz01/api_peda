'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alcoholes = sequelize.define('Alcoholes', {
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {});
  Alcoholes.associate = function(models) {
    // associations can be defined here
  };
  return Alcoholes;
};