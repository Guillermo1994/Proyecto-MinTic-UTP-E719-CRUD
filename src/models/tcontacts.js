const mongoose = require ('mongoose')
const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    asunto: String,
    comentarios: String,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('tcontacts', UsuarioSchema)