import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './components/Home';
import {Resultadobusqueda} from './components/Resultadobusqueda';
import './styles/App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Resultadobusqueda/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/resultadobusqueda/:termino' element={<Resultadobusqueda/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App;
