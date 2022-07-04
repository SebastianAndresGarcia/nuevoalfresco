import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './components/Home';
import {Resultadobusqueda} from './components/Resultadobusqueda';
import { Cargarnuevascausas } from './components/cargarnuevascausas';
import './styles/App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/resultadobusqueda/:termino' element={<Resultadobusqueda/>}/>
        <Route path='/cargarnuevascausas' element={<Cargarnuevascausas/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App;
