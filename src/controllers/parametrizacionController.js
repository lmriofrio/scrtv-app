const express = require('express');
const router = express.Router();
const TiposPruebas = require('../../src/models/TiposPruebas');
const EquiposMecatrónicos = require('../../src/models/ConfiguracionesEquiposMecatrónicos');
const TiposResultados = require('../../src/models/ConfiguracionesTiposResultados');

router.get('/leer-tiposPruebas', async (req, res) => {
    try {

        const tiposPruebas = await TiposPruebas.findAll();
        res.json({ success: true, tiposPruebas });

    } catch (error) {
        console.error('Error al buscar trámites:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

router.get('/leer-EquiposMecatronicos', async (req, res) => {
    try {

        const equiposMecatrónicos = await EquiposMecatrónicos.findAll();
        res.json({ success: true, equiposMecatrónicos });


    } catch (error) {
        console.error('Error al buscar trámites:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

router.get('/leer-TiposResultados', async (req, res) => {
    try {

        const tiposResultadosGeneral = await TiposResultados.findAll();

        const tiposResultadosMotos = await TiposResultados.findAll({
            where: {
                vehiculo_capacidad_maxima_2T: 'SI'
            }
        });

        const tiposResultadosVehiculoLiv = await TiposResultados.findAll({
            where: {
                vehiculo_capacidad_maxima_3_5T: 'SI'
            }
        });

        const tiposDefectosVehiculosPesados = await TiposResultados.findAll({
            where: {
                vehiculo_capacidad_superior_3_5T: 'SI'
            }
        });

        res.json({ success: true, tiposResultadosGeneral, tiposResultadosMotos, tiposResultadosVehiculoLiv, tiposDefectosVehiculosPesados });


    } catch (error) {
        console.error('Error al buscar trámites:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});
module.exports = router;