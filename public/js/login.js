$(document).ready(function () {
    $('#loginFormulario').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/login',
            data: formData,
            success: function (response) {
                if (response.success) {
                    window.location.href = response.redirect;
                } else {
                    $('#btnIngresar').removeClass('mt-3');
                    $('#errorPasswordMessage').removeClass('d-none');
                    let mensaje = 'Error en el inicio de sesión.';
                    if (response.message === 'CREDENCIALES INCORRECTAS') {
                        mensaje = 'Usuario o contraseña incorrectos.';
                    } else if (response.message === 'USUARIO INACTIVO') {
                        mensaje = 'El usuario se encuentra inactivo.';
                    }
                }
            },
            error: function (error) {
                console.error('Error en la solicitud AJAX:', error.statusText);
            }
        });
    });
});
