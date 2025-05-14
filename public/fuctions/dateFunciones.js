


/// Obtiene la fecha actual
function obtenerFechaActual() {
    const currentDate = new Date();
    const localDate = new Date(currentDate.toLocaleString("en-US", { timeZone: "America/Guayaquil" }));

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');
    const hours = localDate.getHours().toString().padStart(2, '0');
    const minutes = localDate.getMinutes().toString().padStart(2, '0');
    const seconds = localDate.getSeconds().toString().padStart(2, '0');

    const fechaActual = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return { fechaActual};
}

module.exports = { obtenerFechaActual };




