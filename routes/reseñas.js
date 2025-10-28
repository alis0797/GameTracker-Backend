const express = require('express');
const router = express.Router();
const Resena = require('../models/reseñas');

// GET - Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const resenas = await Resena.find().populate('juegoId').sort({ fecha: -1 });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas', error: error.message });
  }
});

// GET - Obtener reseñas de un juego específico
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.juegoId }).sort({ fecha: -1 });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas del juego', error: error.message });
  }
});

// GET - Obtener una reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id).populate('juegoId');
    if (!resena) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(resena);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la reseña', error: error.message });
  }
});

// POST - Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaResena = new Resena(req.body);
    const resenaGuardada = await nuevaResena.save();
    res.status(201).json(resenaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la reseña', error: error.message });
  }
});

// PUT - Actualizar una reseña
router.put('/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!resenaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(resenaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la reseña', error: error.message });
  }
});

// DELETE - Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!resenaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json({ mensaje: 'Reseña eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar las reseñas', error: error.message });
  }
});

module.exports = router;