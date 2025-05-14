const express = require('express');
const router = express.Router();
const TiposPruebas = require('../models/TiposPruebas');
const EquiposMecatrónicos = require('../models/ConfiguracionesEquiposMecatrónicos');

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

module.exports = router;