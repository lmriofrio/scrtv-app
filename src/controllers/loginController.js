const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const Usuario = require('../../src/models/Usuario');

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        try {
            const usuario = await Usuario.findOne({ where: { username_usuario: username } });

            if (!usuario) {
                return res.json({ success: false, message: 'CREDENCIALES INCORRECTAS' });
            }

            if (usuario.estado_usuario !== 'ACTIVO') {
                return res.json({ success: false, message: 'USUARIO INACTIVO' });
            }

            if (!(await bcryptjs.compare(password, usuario.password_usuario))) {
                return res.json({ success: false, message: 'CREDENCIALES INCORRECTAS' });
            }

            const sessionData = {
                id_usuario: usuario.id_usuario,
                username_usuario: usuario.username_usuario,
                nombre_usuario: usuario.nombre_usuario,
                nombre_usuario_corto: usuario.nombre_usuario_corto,
                id_empresa_usuario: usuario.id_empresa_usuario,
                nombre_empresa_usuario: usuario.nombre_empresa_usuario,
            };

            req.session.usuario = sessionData;
            return res.json({ success: true, redirect: '/home' });

        } catch (error) {
            console.error('Error al autenticar el usuario:', error);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    } else {
        return res.status(400).json({ success: false, message: 'Nombre de usuario y contraseña requeridos' });
    }
});

module.exports = router;
