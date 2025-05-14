const express = require('express');
const soap = require('soap');
const router = express.Router();
const ConexionesEmpresa = require('../../src/models/ConexionesEmpresa');

router.post('/buscar-vehiculo-ANT', async (req, res) => {
    const id_empresa = req.session.usuario.id_empresa_usuario;
    let { placa } = req.body;

    if (!placa || placa.trim() === "") {
        return res.status(400).json({ error: "El valor de la placa esta vacio" });
    }

    placa = placa.toUpperCase();

    try {
        const conexion = await ConexionesEmpresa.findOne({
            where: { id_empresa: id_empresa }
        });

        const url = conexion.url_ws_consultas;
        const username = conexion.username;
        const password = conexion.password;
        const args = { placa };

        soap.createClient(url, { timeout: 5000 }, function (err, client) {
            if (err) {
                //console.error('No es posible consultar a la URL del servicio web', err.message);
                return res.json({ placa, message: 'No es posible consultar a la URL del servicio web' });
            }

            const customHeaders = {
                'username': username,
                'password': password
            };


            client.addHttpHeader('username', customHeaders.username);
            client.addHttpHeader('password', customHeaders.password);


            client.consultarVehiculo(args, function (err, result) {
                if (err) {
                    console.error('Error en la consulta:', err);
                    return res.status(500).json({ success: false, message: 'Error en la consulta al servicio SOAP' });
                }

                // Verificacion de una respuesta vacia, sin el objeto return o sin el objeto resultado
                if (!result || !result["return"] || !result["return"].resultado) {
                    return res.json({ placa, message: 'El servicio ANT no responde' });
                }

                const returnData = result["return"];

                // Verificar si 'resultado' está vacío o no contiene 'codError'
                if (!returnData?.resultado || !returnData.resultado.codError) {
                    return res.json({ resultado: returnData.resultado, placa, message: 'El servicio ANT no devolvió un resultado' });
                }

                const { codError } = returnData.resultado;

                if (codError === '0') {
                    const vehiculo = {
                        activoVig: returnData.activoVig,
                        anio: returnData.anio,
                        canvcp: returnData.canvcp,
                        capacidad: returnData.capacidad,
                        carroceria: returnData.carroceria,
                        chasis: returnData.chasis,
                        cilindraje: returnData.cilindraje,
                        claseServicio: returnData.claseServicio,
                        claseTran: returnData.claseTran,
                        claseVehiculo: returnData.claseVehiculo,
                        color: returnData.color,
                        combustible: returnData.combustible,
                        docPropietario: returnData.docPropietario,
                        marca: returnData.marca,
                        marcaDesc: returnData.marcaDesc,
                        modelo: returnData.modelo,
                        modeloDesc: returnData.modeloDesc,
                        motor: returnData.motor,
                        nombreBenef: returnData.nombreBenef,
                        numEjes: returnData.numEjes,
                        numRuedas: returnData.numRuedas,
                        propietario: returnData.propietario,
                        pais: returnData.pais,
                        telefono: returnData.telefono,
                        tipoIdentBenef: returnData.tipoIdentBenef,
                        tipoPeso: returnData.tipoPeso,
                        tipoVehiculo: returnData.tipoVehiculo,
                        tipoServicio: returnData.tipoServicio,
                        tonelaje: returnData.tonelaje,

                        resultado: returnData.resultado,
                    };

                    return res.json({ success: true, vehiculo: vehiculo, placa, message: 'Consulta realizada con éxito' });
                }

                if (codError === '-1') {
                    return res.json({ resultado: returnData.resultado, placa, message: 'Consulta realizada con éxito'  });
                }

                return res.json({ resultado: returnData.resultado, placa, message: 'Error en el SCRTV' });

            });
        });
    } catch (error) {
        console.error('Error al buscar vehículo en la ruta:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});



module.exports = router;
