import { useState, useEffect } from 'react';
import { obtenerJuegos } from '../services/api';
import './EstadisticasPersonales.css';

function EstadisticasPersonales() {
  const [estadisticas, setEstadisticas] = useState({
    totalJuegos: 0,
    juegosCompletados: 0,
    horasTotales: 0,
    promedioCalificacion: 0,
    plataformaMasUsada: '',
    generoFavorito: ''
  });

  useEffect(() => {
    calcularEstadisticas();
  }, []);

  const calcularEstadisticas = async () => {
    try {
      const juegos = await obtenerJuegos();
      
      const totalJuegos = juegos.length;
      const juegosCompletados = juegos.filter(j => j.completado).length;
      const horasTotales = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);
      
      // Promedio de calificación
      const sumaCalificaciones = juegos.reduce((sum, j) => sum + (j.calificacion || 0), 0);
      const promedioCalificacion = totalJuegos > 0 ? (sumaCalificaciones / totalJuegos).toFixed(1) : 0;
      
      // Plataforma más usada
      const plataformas = {};
      juegos.forEach(j => {
        plataformas[j.plataforma] = (plataformas[j.plataforma] || 0) + 1;
      });
      const plataformaMasUsada = Object.keys(plataformas).reduce((a, b) => 
        plataformas[a] > plataformas[b] ? a : b, ''
      );
      
      // Género favorito
      const generos = {};
      juegos.forEach(j => {
        generos[j.genero] = (generos[j.genero] || 0) + 1;
      });
      const generoFavorito = Object.keys(generos).reduce((a, b) => 
        generos[a] > generos[b] ? a : b, ''
      );
      
      setEstadisticas({
        totalJuegos,
        juegosCompletados,
        horasTotales,
        promedioCalificacion,
        plataformaMasUsada,
        generoFavorito
      });
    } catch (error) {
      console.error('Error al calcular estadísticas:', error);
    }
  };

  return (
    <div className="estadisticas-container">
      <h2 className="estadisticas-titulo">
        <span className="icon">📊</span>
        TUS ESTADÍSTICAS
      </h2>

      <div className="estadisticas-grid">
        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-numero">{estadisticas.totalJuegos}</div>
          <div className="stat-label">Total de Juegos</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-numero">{estadisticas.juegosCompletados}</div>
          <div className="stat-label">Completados</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-numero">{estadisticas.horasTotales}h</div>
          <div className="stat-label">Horas Totales</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-numero">{estadisticas.promedioCalificacion}</div>
          <div className="stat-label">Calificación Promedio</div>
        </div>

        <div className="stat-card wide">
          <div className="stat-icon">🕹️</div>
          <div className="stat-info">
            <div className="stat-numero-text">{estadisticas.plataformaMasUsada || 'N/A'}</div>
            <div className="stat-label">Plataforma Favorita</div>
          </div>
        </div>

        <div className="stat-card wide">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-numero-text">{estadisticas.generoFavorito || 'N/A'}</div>
            <div className="stat-label">Género Favorito</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstadisticasPersonales;