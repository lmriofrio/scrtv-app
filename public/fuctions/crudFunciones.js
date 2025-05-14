const Usuario = require('../../src/models/Usuario');
const OrdenTrabajo = require('../../src/models/OrdenTrabajo');


// Listo
async function createOT({
    placa,
    id_orden_ANT,
    fecha_orden_ANT,}) {

    console.log('------   OT no encontrada, creando desde las funcionalidades -------');

    const placaMayus = placa.toUpperCase();

    ordenTrabajo = await OrdenTrabajo.create({
        id_orden_ANT: id_orden_ANT,
        placa: placaMayus,
        fecha_orden_ANT: fecha_orden_ANT,
    });

    return { id_orden: ordenTrabajo.id_orden, id_orden_ANT: ordenTrabajo.id_orden_ANT };
}
module.exports = { createOT };




