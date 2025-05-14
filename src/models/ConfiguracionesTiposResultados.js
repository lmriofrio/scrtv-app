const { DataTypes } = require('sequelize');
const db = require('../config/config');

const TiposResultados = db.define('tabla-conf-tipos-resultados', {
    id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        autoIncrement: false
    },
    tipo_resultado: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    nombre_resultado: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    vehiculo_capacidad_maxima_2T: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    vehiculo_capacidad_maxima_3_5T: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    vehiculo_capacidad_superior_3_5T: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }
}, {
    tableName: 'tabla-conf-tipos-resultados',
    timestamps: false,
    indexes: []
});

module.exports = TiposResultados; 
