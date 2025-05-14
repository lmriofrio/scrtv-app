const { DataTypes } = require('sequelize');
const db = require('../config/config');

const TiposPruebas = db.define('tabla-conf-tipos-pruebas', {
    id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        autoIncrement: false
    },
    tipo_prueba: {
        type: DataTypes.STRING(200),
        allowNull: true,
    }
}, {
    tableName: 'tabla-conf-tipos-pruebas',
    timestamps: false,
    indexes: []
});

module.exports = TiposPruebas; 
