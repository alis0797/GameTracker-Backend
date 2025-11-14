import { useState, useEffect } from 'react';
import { obtenerResenas, eliminarResena } from '../services/api';
import FormularioResena from './FormularioResena';
import './ListaResenas.css';

function ListaResenas() {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [resenaEditar, setResenaEditar] = useState(null);

  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      setCargando(true);
      const data = await obtenerResenas();
      setResenas(data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await eliminarResena(id);
        cargarResenas();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la reseña');
      }
    }
  };

  const handleEditar = (resena) => {
    setResenaEditar(resena);
    setMostrarFormulario(true);
  };

  const handleNuevaResena = () => {
    setResenaEditar(null);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setResenaEditar(null);
    cargarResenas();
  };

  if (cargando) {
    return <div className="loading-resenas">Cargando reseñas...</div>;
  }

  return (
    <div className="resenas-container">
      <div className="resenas-header">
        <h2 className="resenas-titulo">
          <span className="icon">📝</span>
          MIS RESEÑAS
        </h2>
        <button className="btn-nueva-resena" onClick={handleNuevaResena}>
          + NUEVA RESEÑA
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioResena
          resenaEditar={resenaEditar}
          onCerrar={handleCerrarFormulario}
          onGuardado={cargarResenas}
        />
      )}

      {resenas.length === 0 ? (
        <div className="sin-resenas">
          <span className="icon-big">✍️</span>
          <p>No hay reseñas aún. ¡Escribe tu primera reseña!</p>
          <button className="btn-primera-resena" onClick={handleNuevaResena}>
            ESCRIBIR PRIMERA RESEÑA
          </button>
        </div>
      ) : (
        <div className="resenas-lista">
          {resenas.map((resena) => (
            <div key={resena._id} className="resena-card">
              <div className="resena-header-card">
                <div className="resena-info">
                  <h3 className="resena-titulo-text">{resena.titulo}</h3>
                  {resena.juegoId && (
                    <p className="resena-juego">
                      Juego: {resena.juegoId.titulo || 'Desconocido'}
                    </p>
                  )}
                </div>
                <div className="resena-calificacion">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < resena.calificacion ? 'estrella-llena' : 'estrella-vacia'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="resena-contenido">{resena.contenido}</p>

              <div className="resena-footer">
                <span className="resena-fecha">
                  {new Date(resena.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <div className="resena-acciones">
                  <button
                    className="btn-editar-resena"
                    onClick={() => handleEditar(resena)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-eliminar-resena"
                    onClick={() => handleEliminar(resena._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaResenas;