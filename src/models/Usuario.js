const { DataTypes } = require('sequelize');
const db = require('../config/config');

const Usuario = db.define('tabla-usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER(15),
    primaryKey: true,
    autoIncrement: false
  },
  username_usuario: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  password_usuario: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  estado_usuario: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  nombre_usuario: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  nombre_usuario_corto: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  id_empresa_usuario: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  nombre_empresa_usuario: {
    type: DataTypes.STRING(90),
    allowNull: false
  }


}, {
  tableName: 'tabla-usuarios',
  timestamps: false,
  indexes: []
});

module.exports = Usuario; 
