const express = require('express');
const soap = require('soap');
const router = express.Router();
const ConexionesEmpresa = require('../../src/models/ConexionesEmpresa.js');
const { createOT } = require('../../public/fuctions/crudFunciones.js');
const { obtenerFechaActual } = require('../../public/fuctions/dateFunciones.js');

router.post('/solicitar-orden-ANT', async (req, res) => {
    const id_empresa = req.session.usuario.id_empresa_usuario;
    let { placa, proceso, tipo_orden, tipo_servicio, clase_servicio, ambito, tipo_transporte, chasis, numero_revision } = req.body;

    if (!placa || placa.trim() === "") {
        return res.status(400).json({ error: "El valor de la placa esta vacio" });
    }

    // obtener fecha actual
    let { fechaActual } = obtenerFechaActual({});

    placa = placa.toUpperCase();
    proceso = proceso.toUpperCase();
    tipo_orden = tipo_orden.toUpperCase();
    numero_revision = numero_revision.toUpperCase();
    tipo_servicio = tipo_servicio.toUpperCase();
    clase_servicio = clase_servicio.toUpperCase();
    ambito = ambito.toUpperCase();
    tipo_transporte = tipo_transporte.toUpperCase();
    chasis = chasis.toUpperCase();

    try {
        const conexion = await ConexionesEmpresa.findOne({
            where: { id_empresa: id_empresa }
        });

        const url = conexion.url_ws_rtv;
        const empresa_codigo_ant = conexion.empresa_codigo_ant;
        const username = conexion.username;
        const password = conexion.password;

        const args = {
            orden: {
                placa: placa,
                ambito: ambito,
                claseServicio: clase_servicio,
                fechaOrden: fechaActual,
                institucion: empresa_codigo_ant,
                numeroRevision: numero_revision,
                proceso: proceso,
                solicitud: 67890,
                tipoOrden: tipo_orden,
                tipoServicio: tipo_servicio,
                tipoTransporte: tipo_transporte,
                vin: chasis
            }
        };

        soap.createClient(url, function (err, client) {
            if (err) {
                console.error('Error al crear cliente SOAP:', err);
                return res.status(500).json({ success: false, message: 'Error al consultar el servicio SOAP' });
            }

            const customHeaders = {
                'username': username,
                'password': password 
            };
        
            client.addHttpHeader('username', customHeaders.username);
            client.addHttpHeader('password', customHeaders.password);
            

            client.solicitarOrden(args, function (err, result) {
                if (err) {
                    console.error('Error en la consulta:', err);
                    return res.status(500).json({ success: false, message: 'Error en la consulta al servicio SOAP' });
                }

                const returnData = result["return"];
                //console.log('returnData:', returnData);
                console.log('returnData.resultado.cod_error:', returnData.resultado.codError);

                if (returnData?.resultado?.codError === '0') {

                    const numeroOrden = returnData.numeroOrden
                    const repeticion = returnData.repeticion
                    const resultado = returnData.resultado

                    // Guardar  
                    let { id_orden, id_orden_ANT } = createOT({
                        placa: placa,
                        id_orden_ANT: numeroOrden,
                        fecha_orden_ANT: fechaActual,
                    });


                    return res.json({ success: true, numeroOrden, repeticion, resultado, placa });
                }


                if (returnData?.resultado?.codError !== '0') {
                    return res.json({ message: 'error', resultado: returnData.resultado, placa });
                }

                else {
                    return res.status(400).json({
                        message: 'Error desconocido en la respuesta del servicio SOAP',
                        resultado: returnData.resultado
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error al buscar vehículo en la ruta:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});



module.exports = router;
