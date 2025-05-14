const { DataTypes } = require('sequelize');
const db = require('../config/config');

const Usuario = db.define('tabla-empresas-conexiones', {
    id_empresa: {
        type: DataTypes.INTEGER(15),
        primaryKey: true,
        autoIncrement: false
    },
    empresa_codigo_ant: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    url_ws_rtv: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    url_ws_consultas: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    username: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: true
    },

}, {
    tableName: 'tabla-empresas-conexiones',
    timestamps: false,
    indexes: []
});

module.exports = Usuario; 
