const { DataTypes } = require('sequelize');
const db = require('../config/config');

const Empresa = db.define('tabla-empresas', {
    id_empresa: {
        type: DataTypes.INTEGER(15),
        primaryKey: true,
        autoIncrement: false
    },
    estado_empresa: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    nombre_empresa: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    nombre_corto_empresa: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'tabla-empresas',
    timestamps: false,
    indexes: []
});

module.exports = Empresa; 