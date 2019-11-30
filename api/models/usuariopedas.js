'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarioPedas = sequelize.define('usuarioPedas', {
    usuario: DataTypes.INTEGER,
    peda: DataTypes.INTEGER,
    calificacion: DataTypes.STRING
  }, {});
  usuarioPedas.associate = function(models) {
    // associations can be defined here
  };
  return usuarioPedas;
};