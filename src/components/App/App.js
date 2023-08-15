import '../../index.css'
import './App.css'
import Main from '../Main/Main'
import NotFound from '../NotFound/NotFound'
import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'

function App() {
  //стейт залогинин пользователь или нет
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main loggedIn={isLoggedIn} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
