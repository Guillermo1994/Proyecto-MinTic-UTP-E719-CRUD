const mongoose = require ('mongoose')

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    asunto: String,
    comentarios: String,
    creadoEn: {
        type: Date,
        default: new Date()
    }
})

const Usuario  = mongoose.model('Usuario', UsuarioSchema)
module.exports = Usuario
