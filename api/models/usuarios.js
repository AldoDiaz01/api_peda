'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {});
  Usuarios.associate = function(models) {
    // associations can be defined here
  };
  return Usuarios;
};