import '../../index.css'
import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import React, { useState, useEffect, useCallback } from 'react'
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
  getAllFilms,
  savedMovie,
  getSavedMovies,
  deleteMovie,
} from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  //Стейт для данных пользователя
  const [currentUser, setCurrentUser] = useState({})
  //Стейт для карточек
  const [savedCards, setSavedCards] = useState([])
  //Стейт для всех фильмов
  const [allCard, setAllCard] = useState([])

  //стейт залогинин пользователь или нет
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loginError, setLoginError] = useState(true)
  const [registerError, setRegisterError] = useState(true)
  const [profileMessage, setProfileMessage] = useState(true)
  const navigate = useNavigate()

  //получить токен
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      setToken(token)
      if (token) {
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
  }, [isLoggedIn])

  /**авторизация пользователя*/
  function handleLogin(loginData) {
    login(loginData)
      .then((res) => {
        localStorage.setItem('jwt', res._id)
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

  //выход из аккаунта
  function logOut() {
    setToken(null)
    localStorage.clear()
    setIsLoggedIn(false)
    setCurrentUser({})
    navigate('/signin')
    console.log('Выход')
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

  //добавляем новое свойство saved
  function handleSavedLike(card, saved) {
    return card.map((m) => {
      m.isLiked = saved.some((s) => s.movieId === m.movieId)
      return m
    })
  }

  //Получаем информацию о пользователе и карточке
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('jwt')
      handleSavedLike(allCard, savedCards)
      //handleSavedLike(savedCards)
      Promise.all([getAllFilms(token), getSavedMovies(token)])
        .then(([userData, savedCards]) => {
          //
          const blendedFilms = userData.map((card) => {
            const localMovie = savedCards.find(
              (localMovie) => localMovie.movieId === card.id
            )

            console.log('localMovie', localMovie)
            /**единое название для всех фильмов*/
            card._id = localMovie !== undefined ? localMovie._id : ''
            card.movieId = card.id
            card.thumbnail = `https://api.nomoreparties.co/${card.image.url}`
            card.saved = localMovie !== undefined
            return card
          })
          //
          setCurrentUser(userData)
          setSavedCards(savedCards.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  // лайк карточки
  function handleSaveCard(card) {
    const token = localStorage.getItem('jwt')
    return savedMovie(card, token)
      .then((newCard) => {
        localStorage.removeItem('saved-movies')
        setSavedCards((prev) => [newCard, ...prev], (card.saved = true))
        console.log('[newCard, ...savedCards]: ', [newCard, ...savedCards])
      })
      .catch((error) => console.log('Ошибка при сохранении фильма', error))
  }

  // удаление карточки
  function handleCardDelete(card) {
    //console.log('handleCardDelete card', card)
    const token = localStorage.getItem('jwt')
    const cardToDelete = savedCards.find((c) => c.movieId === card.movieId)
    //console.log(cardToDelete._id)
    return deleteMovie(cardToDelete._id)
      .then(() => {
        setSavedCards(
          (savedCards) =>
            savedCards.map((savedCard) => {
              if (savedCard._id !== card._id) {
                savedCard.saved = false
              }
              return savedCard
            }),
          /**сохранить отредактированный список фильмов в локальное хранилище*/
          localStorage.setItem('local-movies', JSON.stringify(cardToDelete)),
          /**сохранить список сохраненных фильмов в локальное хранилище*/
          localStorage.setItem(
            'saved-movies',
            JSON.stringify(savedCards.filter((movie) => movie.saved))
          )
        )
        //localStorage.removeItem('saved-movies')
      })
      .catch((error) => console.log('Ошибка при удалении фильма', error))
  }

  const render = (loggedIn) => {
    if (loggedIn) {
      navigate('/')
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                onLikeCard={handleSaveCard}
                isLoggedIn={isLoggedIn}
                savedCards={savedCards}
                onDelete={handleCardDelete}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                savedCards={savedCards}
                onDelete={handleCardDelete}
              />
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
