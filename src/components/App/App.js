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
import { CurrentUserContext } from '../../context/CurrentUserContext'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  login,
  getUserData,
  register,
  setToken,
  updateUserInfo,
} from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  //Стейт для данных пользователя
  const [currentUser, setCurrentUser] = useState({})
  //стейт залогинин пользователь или нет
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loginError, setLoginError] = useState(true)
  const [registerError, setRegisterError] = useState(true)
  const [profileMessage, setProfileMessage] = useState(true)
  const navigate = useNavigate()

  //выход из аккаунта
  function logOut() {
    setToken(null)
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setCurrentUser({})
    navigate('/signin')
    console.log('Выход')
  }
  //получить токен
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token')
      setToken(jwt)
      if (jwt) {
        getUserData()
          .then((user) => {
            setCurrentUser(user)
            setIsLoggedIn(true)
          })
          .catch((err) => {
            setIsLoggedIn(false)
            logOut()
            if (err === 'Ошибка: 401') {
              setLoginError(
                'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
              )
            }
            if (err === 'Ошибка: 403') {
              setLoginError(
                'При авторизации произошла ошибка. Переданный токен некорректен.'
              )
            }
          })
      } else {
        setIsLoggedIn(false)
      }
    }
  }, [navigate])

  /**зарегистрировать пользователя*/
  function handleRegister(regData) {
    const email = regData.email
    console.log(email)
    const password = regData.password
    register(regData)
      .then((res) => {
        handleLogin({ email, password })
        navigate('/movies')
      })
      .catch((err) => {
        setIsLoggedIn(false)
        if (err === 400) {
          setRegisterError('Некорректнo введены данные')
        }
        if (err === 409) {
          setRegisterError('Пользователь с таким email уже существует')
        }
        if (err === 500) {
          setRegisterError('На сервере произошла ошибка')
        }
      })
  }

  /**авторизация пользователя*/
  function handleLogin(loginData) {
    login(loginData)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        navigate('/movies')
        setIsLoggedIn(true)
      })
      .catch((err) => {
        setIsLoggedIn(false)
        if (err === 400 || err === 401) {
          setLoginError('Вы ввели неправильный логин или пароль')
        }
        if (err === 500) {
          setLoginError('На сервере произошла ошибка')
        }
      })
  }

  /**изменить данные пользователя*/
  function handleUpdateUser(userData) {
    updateUserInfo(userData)
      .then((newUser) => {
        setCurrentUser(newUser)
        setProfileMessage('Данные успешно обновлены')
      })
      .catch((err) => {
        if (err === 409) {
          setProfileMessage('Пользователь с таким email уже существует')
        } else {
          setProfileMessage('При обновлении профиля произошла ошибка')
        }
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                logOut={logOut}
                profileMessage={profileMessage}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route
            path='/signup'
            element={
              <Register
                registerUser={handleRegister}
                registerError={registerError}
                setRegisterError={setRegisterError}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
