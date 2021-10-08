const path = require ('path')
const express = require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose')
const app = express();

//Conecting to db
mongoose.connect('mongodb://localhost/crud-mascotas')

    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.log('err'));

//Importing routes
const indexRoutes = require('./routes/index');
app.use(express.static('public'));

//Settings
app.set('port', process.env.PORT || 3000) // Toma puerto de SO, si no existe toma 3000, posteriormente se maneja cmo variable
app.set('views', path.join(__dirname, 'views')); //Modulo path concatena para que se use en cualquier SO
app.set('view engine', 'ejs');

//Middlewares (Funcion que se ejecuta antes de que lleguen a las rutas: Morgan)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Entender que nos envian desde el navegador


//Routes
app.use('/', indexRoutes); //Llamar rutas definidas en index

//Initial server
app.listen(app.get('port'), () =>{
    console.log(`Servidor en puerto ${app.get('port')}`);
});