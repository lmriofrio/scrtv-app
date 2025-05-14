$(document).ready(function () {

  $('#buscarVehiculoANT').click(function () {

    const placa = $('input[name="placa"]').val();

    if (!placa) {
      alert('Por favor ingresa el número de placa');
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/buscar-vehiculo-ANT',
      data: JSON.stringify({ placa }),
      contentType: 'application/json',
      success: function (response) {

        $('#errorConexionANT, #errorANT_otros, #errorANT_SV, #vehiculoNoEncontrado').addClass('d-none');
        $('#vehiculoEncontrado, #info-vehiculo, #info-orden').addClass('d-none');

        if (response.success) {
          console.log("Vehiculo encontrado");

          $('#vehiculoEncontrado').removeClass('d-none');

          $('#vsl_placa').val(response.placa);
          $('#vsl_rawn').val(response.vehiculo.canvcp);
          $('#vsl_chasis').val(response.vehiculo.chasis);
          $('#vsl_motor').val(response.vehiculo.motor);
          $('#vsl_color1').val(response.vehiculo.color);
          $('#vsl_pais').val(response.vehiculo.pais);
          $('#vsl_marca').val(response.vehiculo.marcaDesc);
          $('#vsl_año').val(response.vehiculo.anio);
          $('#vsl_capacidad').val(response.vehiculo.capacidad);
          $('#vsl_cilindraje').val(response.vehiculo.cilindraje);
          $('#vsl_combustible').val(response.vehiculo.combustible);
          $('#vsl_modelo').val(response.vehiculo.modelo);
          $('#vsl_carroceria').val(response.vehiculo.carroceria);
          $('#vsl_numero_ejes').val(response.vehiculo.numEjes);
          $('#vsl_clase_transporte').val(response.vehiculo.claseTran);
          $('#vsl_clase_servicio').val(response.vehiculo.claseServicio);
          $('#vsl_numero_ruedas').val(response.vehiculo.numRuedas);
          $('#vsl_tonelaje').val(response.vehiculo.tonelaje);
          $('#vsl_tipo_peso').val(response.vehiculo.tipoPeso);

          $('#info-vehiculo, #info-orden').removeClass('d-none');
          return;
        }

        // Si no hay resultado o codError está indefinido (error en la base de datos ANT)
        if (!response.resultado || typeof response.resultado.codError === 'undefined') {
          console.log("error en la base de datos ANT");
          $('#errorConexionANT, #errorANT_otros').removeClass('d-none');
          $('#errorMensaje_otros').text(response.message || 'Error desconocido');
          return;
        }

        // Manejo de errores por codError
        switch (response.resultado.codError) {

          case '0':
            console.log("Código de error es 0, no se realiza ninguna acción adicional.");
            break;


          case '-1':
            console.log("Código de error es -1 ");
            $('#vehiculoNoEncontrado, #errorANT_SV').removeClass('d-none');
            $('#errorCodigo_SV').text(response.resultado.codError);
            $('#errorMensaje_SV').text(response.resultado.mensaje);
            break;

          default:
            console.log("Código de error diferente de -1 y 0: ", response.resultado.codError);
            $('#errorANT_otros').removeClass('d-none');
            $('#errorCodigo_otros').text(response.resultado.codError);
            $('#errorMensaje_otros').text(response.resultado.mensaje);
            break;

        }
      },
      error: function (error) {
        console.error('Error al buscar vehículo:', error);
        alert('Error al buscar vehículo. Por favor, inténtelo de nuevo.');
      }
    });




  });

});
