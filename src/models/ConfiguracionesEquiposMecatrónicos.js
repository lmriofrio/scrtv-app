const { DataTypes } = require('sequelize');
const db = require('../config/config');

const EquiposMecatrónicos = db.define('tabla-conf-equipos-mecatrónicos', {
    id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        autoIncrement: false
    },
    nombre_equipo_mecatrónico: {
        type: DataTypes.STRING(200),
        allowNull: true,
    }
}, {
    tableName: 'tabla-conf-equipos-mecatrónicos',
    timestamps: false,
    indexes: []
});

module.exports = EquiposMecatrónicos; 
