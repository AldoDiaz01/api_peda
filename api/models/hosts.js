'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hosts = sequelize.define('Hosts', {
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {});
  Hosts.associate = function(models) {
    // associations can be defined here
  };
  return Hosts;
};