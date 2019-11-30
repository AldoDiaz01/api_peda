'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedas = sequelize.define('Pedas', {
    horario: DataTypes.STRING,
    cantidad: DataTypes.STRING,
    presupuesto: DataTypes.STRING,
    host: DataTypes.INTEGER
  }, {});
  Pedas.associate = function(models) {
    // associations can be defined here
  };
  return Pedas;
};
