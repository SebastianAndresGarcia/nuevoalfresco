import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './components/Home';
import {Resultadobusqueda} from './components/Resultadobusqueda';
import { Cargarnuevascausas } from './components/cargarnuevascausas';
import Login from "./components/Login";
import Signup from "./components/Signup"
import './styles/App.css'

import AuthService from "./services/auth.service";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/resultadobusqueda/:termino' element={<Resultadobusqueda/>}/>
        <Route path='/cargarnuevascausas' element={<Cargarnuevascausas/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App;
