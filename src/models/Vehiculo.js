
const { DataTypes } = require('sequelize');
const db = require('../config/config');

const Vehiculo = sequelize.define('tabla-vehiculos', {
    id_vehiculo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    placa: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    vin: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    motor: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'tabla-vehiculos',
    timestamps: false,
    indexes: []
});

module.exports = Vehiculo;



