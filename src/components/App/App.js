import '../../index.css'
import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
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

  const cardsTotal = 12
  const cardsTotalSave = 4
  const cards = Array(cardsTotal).fill(null)
  const saveCards = Array(cardsTotalSave).fill(null)
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main loggedIn={isLoggedIn} />} />
        <Route
          path='/movies'
          element={<Movies loggedIn={isLoggedIn} cards={cards} />}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies loggedIn={isLoggedIn} cards={saveCards} />}
        />
        <Route path='/profile' element={<Profile loggedIn={isLoggedIn} />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
