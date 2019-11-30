'use strict';
module.exports = (sequelize, DataTypes) => {
  const hostPedas = sequelize.define('hostPedas', {
    host: DataTypes.INTEGER,
    peda: DataTypes.INTEGER,
    calificacion: DataTypes.STRING
  }, {});
  hostPedas.associate = function(models) {
    // associations can be defined here
  };
  return hostPedas;
};