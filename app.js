require("dotenv").config();
const express = require('express');
const session = require('express-session');
const soap = require("soap");
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require("./src/config/config.js");
const favicon = require('serve-favicon');

const app = express();
const PORT = 3001;

// Modelos
const Usuario = require('./src/models/Usuario');
const Empresa = require('./src/models/Empresa');
const OrdenTrabajo = require('./src/models/OrdenTrabajo');
const ConexionesEmpresa = require('./src/models/ConexionesEmpresa');
const ConfiguracionesEmpresa = require('./src/models/ConfiguracionesEmpresa');
const TiposPruebas = require('./src/models/TiposPruebas.js');
const EquiposMecatrónicos = require('./src/models/ConfiguracionesEquiposMecatrónicos.js');
const TiposResultados = require('./src/models/ConfiguracionesTiposResultados.js');

// Declarar funciones para poder utilizarlas
const { createOT } = require('./public/fuctions/crudFunciones.js');
const { obtenerFechaActual } = require('./public/fuctions/dateFunciones.js');

// Configuración de express-seccion para la secion de usuarios
app.use(session({
  secret: 't]nTsLU38>9v',
  resave: true,
  saveUninitialized: true
}));

// Controladores
const loginController = require('./src/controllers/loginController.js');
const wsConsultasController = require('./src/controllers/wsConsultasController.js');
const wsOrdenesController = require('./src/controllers/wsOrdenesController.js');
const parametrizacionController = require('./src/controllers/parametrizacionController.js');

// Middlewares
app.use(favicon(path.join(__dirname, 'public', 'ico/favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Declaración de rutas
app.use('/', loginController);
app.use('/', wsConsultasController);
app.use('/', wsOrdenesController);
app.use('/', parametrizacionController);

app.get('/', async (req, res) => {
  if (req.session.usuario) {

    res.render('home', { user: req.session.usuario });
  } else {
    res.redirect('/login');
  }
});

app.get('/home', async (req, res) => {
  if (req.session.usuario) {



    res.render('home', { user: req.session.usuario });
  } else {
    res.redirect('/');
  }
});



////////////////////////////////////////////////
//////////   MODULO DE INGRESO VEHICULAR
////////////////////////////////////////////////

app.get('/ingreso-vehicular/ingreso-vehiculos', async (req, res) => {
  if (req.session.usuario) {

    res.render('ingreso-vehicular/ingreso-vehiculos', { user: req.session.usuario });
  } else {
    res.redirect('/login');
  }
});
app.get('/ingreso-vehicular/listado-revisiones', async (req, res) => {
  if (req.session.usuario) {


    res.render('ingreso-vehicular/listado-revisiones', { user: req.session.usuario });
  } else {
    res.redirect('/');
  }
});
app.get('/ingreso-vehicular/orden-generada', async (req, res) => {
  if (req.session.usuario) {


    res.render('ingreso-vehicular/orden-generada', { user: req.session.usuario });
  } else {
    res.redirect('/');
  }
});

////////////////////////////////////////////////
//////////   MODULO DE CONFIGURACION DE PARAMETROS
////////////////////////////////////////////////

app.get('/configuracion-parametros/listado-pruebas', async (req, res) => {
  if (req.session.usuario) {


    res.render('configuracion-parametros/listado-pruebas', { user: req.session.usuario });
  } else {
    res.redirect('/');
  }
});
app.get('/configuracion-parametros/listado-equipos', async (req, res) => {
  if (req.session.usuario) {


    res.render('configuracion-parametros/listado-equipos', { user: req.session.usuario });
  } else {
    res.redirect('/');
  }
});
app.get('/configuracion-parametros/listado-resultados-capacidad-carga', async (req, res) => {
  if (req.session.usuario) {
    res.render('configuracion-parametros/listado-resultados-capacidad-carga', { user: req.session.usuario });
  } else {
    res.redirect('/');
  }
});


////////////////////////////////////////////////
//////////   MODULO DE CONFIGURACION GENERAL
////////////////////////////////////////////////


app.get('/configuracion-general/configuracion', async (req, res) => {
  if (req.session.usuario) {



    const id_usuario = req.session.usuario.id_usuario;
    const id_empresa = req.session.usuario.id_empresa_usuario;


    const usuario = await Usuario.findOne({ where: { id_usuario: id_usuario } });
    const empresa = await Empresa.findOne({ where: { id_empresa: id_empresa } });
    const conexionesEmpresa = await ConexionesEmpresa.findOne({ where: { id_empresa: id_empresa } });
    const configuracionesEmpresaEmpresa = await ConfiguracionesEmpresa.findOne({ where: { id_empresa: id_empresa } });

    res.render('configuracion-general/configuracion', { user: req.session.usuario, usuario, empresa, conexionesEmpresa, configuracionesEmpresaEmpresa });
  } else {
    res.redirect('/login');
  }
});





app.get('/login', async (req, res) => {
  res.render('login');
});

sequelize.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada."))
  .catch((error) => console.error("Error al sincronizar la base de datos:", error));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
