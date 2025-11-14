import { useState, useEffect } from 'react';
import { crearResena, actualizarResena, obtenerJuegos } from '../services/api';
import './FormularioResena.css';

function FormularioResena({ resenaEditar, onCerrar, onGuardado }) {
  const [formData, setFormData] = useState({
    juegoId: '',
    titulo: '',
    contenido: '',
    calificacion: 0
  });

  const [juegos, setJuegos] = useState([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarJuegos();
    
    if (resenaEditar) {
      setFormData({
        juegoId: resenaEditar.juegoId?._id || resenaEditar.juegoId || '',
        titulo: resenaEditar.titulo || '',
        contenido: resenaEditar.contenido || '',
        calificacion: resenaEditar.calificacion || 0
      });
    }
  }, [resenaEditar]);

  const cargarJuegos = async () => {
    try {
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.juegoId || !formData.titulo || !formData.contenido) {
      alert('⚠️ Por favor completa todos los campos');
      return;
    }

    try {
      setEnviando(true);

      if (resenaEditar) {
        await actualizarResena(resenaEditar._id, formData);
      } else {
        await crearResena(formData);
      }

      onGuardado();
      onCerrar();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('❌ Error al guardar la reseña');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-resena" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{resenaEditar ? '✏️ EDITAR RESEÑA' : '📝 NUEVA RESEÑA'}</h2>
          <button onClick={onCerrar} className="btn-cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="formulario-resena">
          <div className="form-group">
            <label>SELECCIONA EL JUEGO *</label>
            <select
              name="juegoId"
              value={formData.juegoId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un juego...</option>
              {juegos.map((juego) => (
                <option key={juego._id} value={juego._id}>
                  {juego.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>TÍTULO DE LA RESEÑA *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Una experiencia inolvidable"
              required
            />
          </div>

          <div className="form-group">
            <label>TU RESEÑA *</label>
            <textarea
              name="contenido"
              value={formData.contenido}
              onChange={handleChange}
              placeholder="Escribe tu opinión sobre el juego..."
              rows="8"
              required
            />
          </div>

          <div className="form-group">
            <label>CALIFICACIÓN (0-5) *</label>
            <input
              type="number"
              name="calificacion"
              value={formData.calificacion}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.5"
              required
            />
            <div className="estrellas-preview">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < formData.calificacion ? 'estrella-llena' : 'estrella-vacia'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-acciones">
            <button type="button" onClick={onCerrar} className="btn-cancelar">
              CANCELAR
            </button>
            <button type="submit" className="btn-guardar" disabled={enviando}>
              {enviando ? 'GUARDANDO...' : (resenaEditar ? 'ACTUALIZAR' : 'PUBLICAR')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioResena;