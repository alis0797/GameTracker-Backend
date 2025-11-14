import './Navbar.css';

function Navbar({ vistaActual, cambiarVista }) {
  const pestanas = [
    { id: 'biblioteca', nombre: 'BIBLIOTECA', icono: '🎮' },
    { id: 'estadisticas', nombre: 'ESTADÍSTICAS', icono: '📊' },
    { id: 'resenas', nombre: 'RESEÑAS', icono: '📝' }
  ];

  return (
    <nav className="navbar-gaming">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo-container">
            <span className="logo-icon">🎮</span>
            <span className="logo-text">GAMETRACKER</span>
          </div>
          <div className="logo-subtitle">YOUR GAMING VAULT</div>
        </div>

        <div className="navbar-tabs">
          {pestanas.map((pestana) => (
            <button
              key={pestana.id}
              className={`nav-tab ${vistaActual === pestana.id ? 'active' : ''}`}
              onClick={() => cambiarVista(pestana.id)}
            >
              <span className="tab-icon">{pestana.icono}</span>
              <span className="tab-text">{pestana.nombre}</span>
              {vistaActual === pestana.id && <div className="tab-indicator"></div>}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;