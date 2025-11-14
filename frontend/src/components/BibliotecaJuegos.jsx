import { useState, useEffect } from 'react';
import { obtenerJuegos, eliminarJuego } from '../services/api';
import FormularioJuego from './FormularioJuego';
import './BibliotecaJuegos.css';

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoEditar, setJuegoEditar] = useState(null);

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
      setError('No se pudieron cargar los juegos. Asegúrate de que el backend esté corriendo.');
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id, titulo) => {
    if (window.confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      try {
        await eliminarJuego(id);
        cargarJuegos();
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar el juego');
      }
    }
  };

  const handleEditar = (juego) => {
    setJuegoEditar(juego);
    setMostrarFormulario(true);
  };

  const handleNuevoJuego = () => {
    setJuegoEditar(null);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setJuegoEditar(null);
    cargarJuegos();
  };

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando biblioteca...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌​ Error de Conexión</h2>
        <p>{error}</p>
        <button onClick={cargarJuegos} className="btn-retry">
          🔄 Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="biblioteca-container">
      <header className="biblioteca-header">
        <div className="header-content">
          <h1 className="titulo-principal">
            <span className="icon">🕹️​</span>
            GAMETRACKER
          </h1>
          <p className="subtitulo">Tu Biblioteca Personal de Videojuegos</p>
        </div>
        <button className="btn-agregar" onClick={handleNuevoJuego}>
          <span>+</span> AGREGAR JUEGO
        </button>
      </header>
      
      {mostrarFormulario && (
        <FormularioJuego
          juegoEditar={juegoEditar}
          onCerrar={handleCerrarFormulario}
          onGuardado={cargarJuegos}
        />
      )}

      {juegos.length === 0 ? (
        <div className="sin-juegos">
          <div className="sin-juegos-content">
            <span className="icon-big">🎯</span>
            <h2>Biblioteca Vacía</h2>
            <p>Comienza agregando tu primer videojuego</p>
            <button className="btn-agregar-grande" onClick={handleNuevoJuego}>
              + AGREGAR PRIMER JUEGO
            </button>
          </div>
        </div>
      ) : (
        <div className="juegos-grid">
          {juegos.map((juego) => (
            <div key={juego._id} className="tarjeta-juego">
              <div className="tarjeta-imagen">
                <img src={juego.portada} alt={juego.titulo} />
                {juego.completado && (
                  <span className="badge-completado">✓ COMPLETADO</span>
                )}
              </div>
              
              <div className="tarjeta-contenido">
                <h3 className="juego-titulo">{juego.titulo}</h3>
                
                <div className="juego-info">
                  <div className="info-item">
                    <span className="label">Plataforma</span>
                    <span className="value">{juego.plataforma}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Género</span>
                    <span className="value">{juego.genero}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Horas</span>
                    <span className="value">{juego.horasJugadas || 0}h</span>
                  </div>
                </div>

                <div className="calificacion">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < juego.calificacion ? 'estrella-llena' : 'estrella-vacia'}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="tarjeta-acciones">
                  <button className="btn-editar" onClick={() => handleEditar(juego)}>
                    ✏️ EDITAR
                  </button>
                  <button 
                    className="btn-eliminar"
                    onClick={() => handleEliminar(juego._id, juego.titulo)}
                  >
                    🗑️ ELIMINAR
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

export default BibliotecaJuegos;