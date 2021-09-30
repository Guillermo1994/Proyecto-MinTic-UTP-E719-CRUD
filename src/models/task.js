const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//Variables dentro de la base de datos. Como se esta almacenando en la base de datos
const TaskSchema = new mongoose.Schema({
    nombre: String,
    raza: String,
    edad: String, // Pense que era numero, pero me sale error, toca String
    foto: String,
    perfil: String,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('task', TaskSchema);