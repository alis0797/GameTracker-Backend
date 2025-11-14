import { useState, useEffect } from 'react';
import { crearJuego, actualizarJuego } from '../services/api';
import './FormularioJuego.css';

function FormularioJuego({ juegoEditar, onCerrar, onGuardado }) {
  const [formData, setFormData] = useState({
    titulo: '',
    portada: '',
    plataforma: '',
    genero: '',
    completado: false,
    calificacion: 0,
    horasJugadas: 0
  });

  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (juegoEditar) {
      setFormData({
        titulo: juegoEditar.titulo || '',
        portada: juegoEditar.portada || '',
        plataforma: juegoEditar.plataforma || '',
        genero: juegoEditar.genero || '',
        completado: juegoEditar.completado || false,
        calificacion: juegoEditar.calificacion || 0,
        horasJugadas: juegoEditar.horasJugadas || 0
      });
    }
  }, [juegoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.plataforma || !formData.genero) {
      alert('⚠️ Por favor completa los campos obligatorios');
      return;
    }

    try {
      setEnviando(true);
      
      if (juegoEditar) {
        await actualizarJuego(juegoEditar._id, formData);
      } else {
        await crearJuego(formData);
      }
      
      onGuardado();
      onCerrar();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('❌ Error al guardar el juego');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {juegoEditar ? '✏️ EDITAR JUEGO' : '➕ AGREGAR JUEGO'}
          </h2>
          <button onClick={onCerrar} className="btn-cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label>TÍTULO DEL JUEGO *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: The Last of Us Part II"
              required
            />
          </div>

          <div className="form-group">
            <label>URL DE LA PORTADA</label>
            <input
              type="text"
              name="portada"
              value={formData.portada}
              onChange={handleChange}
              placeholder="https://ejemplo.com/portada.jpg"
            />
            {formData.portada && (
              <div className="preview-imagen">
                <img src={formData.portada} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PLATAFORMA *</label>
              <select
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="Xbox Series X/S">Xbox Series X/S</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="PC">PC</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div className="form-group">
              <label>GÉNERO *</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="RPG">RPG</option>
                <option value="Shooter">Shooter</option>
                <option value="Deportes">Deportes</option>
                <option value="Estrategia">Estrategia</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Terror">Terror</option>
                <option value="Simulación">Simulación</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CALIFICACIÓN (0-5)</label>
              <input
                type="number"
                name="calificacion"
                value={formData.calificacion}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.5"
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

            <div className="form-group">
              <label>HORAS JUGADAS</label>
              <input
                type="number"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                min="0"
                step="0.5"
              />
            </div>
          </div>

          <div className="form-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="completado"
                checked={formData.completado}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">✓ JUEGO COMPLETADO</span>
            </label>
          </div>

          <div className="form-acciones">
            <button type="button" onClick={onCerrar} className="btn-cancelar">
              CANCELAR
            </button>
            <button type="submit" className="btn-guardar" disabled={enviando}>
              {enviando ? 'GUARDANDO...' : (juegoEditar ? 'ACTUALIZAR' : 'AGREGAR')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioJuego;