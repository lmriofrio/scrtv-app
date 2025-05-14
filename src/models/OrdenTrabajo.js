const { DataTypes } = require('sequelize');
const db = require('../config/config');

const OrdenTrabajo = db.define('tabla-ordenes-trabajo', {
    id_orden: {
        type: DataTypes.INTEGER(15),
        primaryKey: true,
        autoIncrement: false
    },
    id_orden_ANT: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    placa: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    fecha_orden_ANT: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'tabla-ordenes-trabajo',
    timestamps: false,
    indexes: []
});

module.exports = OrdenTrabajo; 
