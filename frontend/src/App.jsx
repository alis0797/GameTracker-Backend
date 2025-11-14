import { useState } from 'react'
import Navbar from './components/Navbar'
import BibliotecaJuegos from './components/BibliotecaJuegos'
import EstadisticasPersonales from './components/EstadisticasPersonales'
import ListaResenas from './components/ListaResenas'

function App() {
  const [vistaActual, setVistaActual] = useState('biblioteca')

  const renderVista = () => {
    switch(vistaActual) {
      case 'biblioteca':
        return <BibliotecaJuegos />
      case 'estadisticas':
        return (
          <div className="vista-container">
            <EstadisticasPersonales />
          </div>
        )
      case 'resenas':
        return (
          <div className="vista-container">
            <ListaResenas />
          </div>
        )
      default:
        return <BibliotecaJuegos />
    }
  }

  return (
    <div className="App">
      <Navbar vistaActual={vistaActual} cambiarVista={setVistaActual} />
      <main className="contenido-principal">
        {renderVista()}
      </main>
    </div>
  )
}

export default App