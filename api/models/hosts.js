'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hosts = sequelize.define('Hosts', {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {});
  Hosts.associate = function(models) {
    // associations can be defined here
  };
  return Hosts;
};