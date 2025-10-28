require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/juegos', require('./routes/juegos'));
app.use('/api/resenas', require('./routes/reseñas'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de GameTracker funcionando correctamente' });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});