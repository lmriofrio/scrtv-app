const { DataTypes } = require('sequelize');
const db = require('../config/config');

const ConfiguracionesEmpresa = db.define('tabla-empresas-configuraciones', {
    id_empresa: {
        type: DataTypes.INTEGER(15),
        primaryKey: true,
        autoIncrement: false
    },
    regla_consultar_multas: {
        type: DataTypes.STRING(15),
        allowNull: true,
    }
}, {
    tableName: 'tabla-empresas-configuraciones',
    timestamps: false,
    indexes: []
});

module.exports = ConfiguracionesEmpresa; 