const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego',
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    contenido: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reseña', reseñaSchema);