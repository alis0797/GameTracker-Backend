const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  portada: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=Sin+Portada'
  },
  plataforma: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  completado: {
    type: Boolean,
    default: false
  },
  calificacion: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  horasJugadas: {
    type: Number,
    default: 0
  },
  fechaAgregado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Juego', juegoSchema);