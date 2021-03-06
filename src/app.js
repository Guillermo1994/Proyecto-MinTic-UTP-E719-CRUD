const path = require ('path')
const express = require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash')

//initializations
const app = express();
require('./database')
require('./passport/local-auth')

//Conecting to db
mongoose.connect('mongodb+srv://ilmero:asdfg1234@cluster0.7kf1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
   .then(db => console.log('Conectado a la base de datos'))
   .catch(err => console.log('Error conectandose a la base de datos'));

//Importing routes
const indexRoutes = require('./routes/index');
app.use(express.static('public'));

//Settings
app.set('port', process.env.PORT || 3000) // Toma puerto de SO, si no existe toma 3000, posteriormente se maneja cmo variable
app.set('views', path.join(__dirname, 'views')); //Modulo path concatena para que se use en cualquier SO
app.set('view engine', 'ejs');
app.engine('ejs', engine)

//Middlewares (Funcion que se ejecuta antes de que lleguen a las rutas: Morgan)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Entender que nos envian desde el navegador

//Creación de los mensajes de error al iniciar sesión
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) =>{
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user
    next()
})



//Routes
app.use('/', indexRoutes); //Llamar rutas definidas en index

//Initial server
app.listen(app.get('port'), () =>{
    console.log(`Servidor en puerto ${app.get('port')}`);
});