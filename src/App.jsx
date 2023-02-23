import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import Pokemon from './pages/Pokemon'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProtectedHome from './components/ProtectedHome'

function App() {
  

  return (
    <div className="App">
      <Routes>
        
        <Route element={<ProtectedHome />}>
          <Route path='/' element={<Home />}/>
        </Route>
        
        <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />}/>
            <Route path='/pokedex/:id' element={<Pokemon />}/>
        </Route>
      
      </Routes>
    </div>
  )
}

export default App
