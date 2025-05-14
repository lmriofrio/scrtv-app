

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/leer-TiposResultados',
        success: function (response) {
            const tbodyGeneral = $('#tbody-resultados-general').empty();
            const tbodyMotos = $('#tbody-resultados-motos').empty();
            const tbodyVehiculosLivianos = $('#tbody-resultados-vehLivianos').empty();
            const tbodyVehiculosPesados = $('#tbody-resultados-vehPesados').empty();

            if (response.success) {
                let numeroFila = 1;

                response.tiposResultadosGeneral.forEach(tiposResultadosGeneral => {
                    const newRow = `
                        <tr style="border-style: none;">
                            <td class="text-center border-end">${numeroFila}</td>
                            <td class="text-start border-end">${tiposResultadosGeneral.id}</td>
                            <td class="text-start border-end">${tiposResultadosGeneral.tipo_resultado}</td>
                            <td class="text-start border-end">${tiposResultadosGeneral.nombre_resultado}</td>
                            <td class="text-start border-end">${tiposResultadosGeneral.vehiculo_capacidad_maxima_2T}</td>
                            <td class="text-start border-end">${tiposResultadosGeneral.vehiculo_capacidad_maxima_3_5T}</td>
                            <td class="text-start">${tiposResultadosGeneral.vehiculo_capacidad_superior_3_5T}</td>
                        </tr>
                    `;
                    tbodyGeneral.append(newRow);
                    numeroFila++;
                });

                let numeroFila2 = 1;

                response.tiposResultadosMotos.forEach(tiposResultadosMotos => {
                    const newRow2 = `
                        <tr style="border-style: none;">
                            <td class="text-center">${numeroFila2}</td>
                            <td class="text-start">${tiposResultadosMotos.nombre_resultado}</td>
                        </tr>
                    `;
                    tbodyMotos.append(newRow2);
                    numeroFila2++;
                });

                let numeroFila3 = 1;

                response.tiposResultadosVehiculoLiv.forEach(tiposResultadosVehiculoLiv => {
                    const newRow3 = `
                        <tr style="border-style: none;">
                            <td class="text-center">${numeroFila3}</td>
                            <td class="text-start">${tiposResultadosVehiculoLiv.nombre_resultado}</td>
                        </tr>
                    `;
                    tbodyVehiculosLivianos.append(newRow3);
                    numeroFila3++;
                });


                let numeroFila4 = 1;

                response.tiposDefectosVehiculosPesados.forEach(tiposDefectosVehiculosPesados => {
                    const newRow4 = `
                        <tr style="border-style: none;">
                            <td class="text-center">${numeroFila4}</td>
                            <td class="text-start">${tiposDefectosVehiculosPesados.nombre_resultado}</td>
                        </tr>
                    `;
                    tbodyVehiculosPesados.append(newRow4);
                    numeroFila4++;
                });
            } else {
                console.log('No se encontraron tipos de pruebas');
            }
        },
        error: function (error) {
            console.error('Error al buscar los equipos:', error);
            alert('Error al buscar los equipos mecatrónicos Por favor, inténtelo de nuevo.');
        }
    });
});
