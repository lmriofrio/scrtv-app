$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/leer-tiposPruebas',
        success: function (response) {
            const tbody = $('#tbody-tramites');
            tbody.empty();

            if (response.success) {
                let numeroFila = 1;

                response.tiposPruebas.forEach(tiposPrueba => {
                    const newRow = `
                        <tr style="border-style: none;">
                            <td class="text-center">${numeroFila}</td>
                            <td class="text-start">${tiposPrueba.id}</td>
                            <td class="text-start">${tiposPrueba.tipo_prueba}</td>
                            <td class="text-center p-0">
                                <div class="btn-group">
                                     <button type="button"
                                     class="justify-content-center btn btn-rounded btn-secondary-empresa d-flex align-items-center">
                                     <i class="bi bi-pencil-square me-2"></i>
                                     Modificar
                                     </button>
                                </div>
                            </td>
                        </tr>
                    `;
                    tbody.append(newRow);
                    numeroFila++;
                });
            } else {
                console.log('No se encontraron tipos de pruebas');
            }
        },
        error: function (error) {
            console.error('Error al buscar tipos de pruebas:', error);
            alert('Error al buscar tipos de pruebas. Por favor, inténtelo de nuevo.');
        }
    });
});

