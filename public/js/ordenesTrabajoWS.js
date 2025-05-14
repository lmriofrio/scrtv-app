$(document).ready(function () {

  $('#solicitarOrdenTrabajoANT').click(function () {

    const placa = $('input[name="vsl_placa"]').val();
    const proceso = $('input[name="info_ot_proceso"]').val();
    const tipo_orden = $('input[name="info_ot_tipo_orden"]').val();
    const numero_revision = $('input[name="info_ot_numero_revision"]').val();
    const tipo_servicio = $('select[name="info_ot_tipo_servicio"]').val();
    const clase_servicio = $('input[name="info_ot_clase_servicio"]').val();
    const ambito = $('input[name="info_ot_ambito"]').val();
    const tipo_transporte = $('input[name="info_ot_tipo_transporte"]').val();
    const chasis = $('input[name="vsl_chasis"]').val();

    if (!placa) {
      alert('Por favor ingresa el número de placa');
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/solicitar-orden-ANT',
      data: JSON.stringify({ placa, proceso, tipo_orden, tipo_servicio, clase_servicio, ambito, tipo_transporte, chasis, numero_revision  }),
      contentType: 'application/json',
      success: function (response) {
        if (response.success) {
          window.location.href = `/ingreso-vehicular/orden-generada`;

        } else {

          if (response.resultado.codError !== '0') {
            console.log("Código de error es diferente de 0 ");

            $('#errorANT_SocilitarOrden').removeClass('d-none');
            $('#errorPlaca_SocilitarOrden').text(response.placa);
            $('#errorCodigo_SocilitarOrden').text(response.resultado.codError);
            $('#errorMensaje_SocilitarOrden').text(response.resultado.mensaje);

          }


        }
      },
      error: function (error) {
        console.error('Error al buscar vehículo:', error);
        alert('Error al buscar vehículo. Por favor, inténtelo de nuevo.');
      }
    });

  });

});
