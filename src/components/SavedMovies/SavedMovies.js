import React, { useState, useEffect } from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { setToken, getAllFilms, deleteMovie } from '../../utils/MainApi'
import { SHORT_MOVIE_DURATION } from '../../utils/constants'

function SavedMovies({ isLoggedIn }) {
  const [statusPreloader, setStatusPreloader] = useState(false)

  // Переменные состояния фильмов
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  //Переменные для хранения состояния фильтра
  const [shortMovieFilterOn, setShortMovieFilterOn] = useState(false)

  useEffect(() => {
    localStorage.setItem('local-movies', JSON.stringify(movies))
  }, [movies])

  // Фильтр фильмов
  const filterMovies = (search) => {
    setShortMovieFilterOn(search.shortMovie)
    setFilteredMovies(
      movies.filter((movie) => {
        const movieTitle = movie.nameRU
          .toLowerCase()
          .includes(search.name.toLowerCase())
        const shortMovie = search.shortMovie
          ? movie.duration <= SHORT_MOVIE_DURATION
          : true
        return movieTitle && shortMovie
      })
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    setToken(token)
    setStatusPreloader(true)
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || '[]')
    if (savedMovies.length === 0) {
      getAllFilms().then((serverMovies) => {
        localStorage.setItem('saved-movies', JSON.stringify(serverMovies))
        setMovies(serverMovies)
        setFilteredMovies(serverMovies)
        setStatusPreloader(false)
      })
    } else {
      setMovies(savedMovies)
      setFilteredMovies(savedMovies)
      setStatusPreloader(false)
    }
  }, [])

  const handleSavedMovie = (movie) => {
    deleteMovie(movie._id).then(() => {
      console.log('фильм удалён')

      /**обновить localStorage для 'local-movies'*/
      const localMovies = JSON.parse(
        localStorage.getItem('local-movies') || '[]'
      )
      const editedLocalMovies = localMovies.map((localMovie) => {
        if (localMovie.id === movie.movieId) {
          localMovie.saved = false
        }
        return localMovie
      })
      localStorage.setItem('local-movies', JSON.stringify(editedLocalMovies))

      /**обновить localStorage и состояния для 'saved-movies' и 'movies'*/
      const savedMovies = JSON.parse(
        localStorage.getItem('saved-movies') || '[]'
      )
      const filteredSavedMovies = savedMovies.filter(
        (savedMovie) => savedMovie._id !== movie._id
      )
      localStorage.setItem('saved-movies', JSON.stringify(filteredSavedMovies))

      setMovies(filteredSavedMovies)
      if (shortMovieFilterOn) {
        setFilteredMovies(
          filteredSavedMovies.filter(
            (movie) => movie.duration <= SHORT_MOVIE_DURATION
          )
        )
      } else {
        setFilteredMovies(filteredSavedMovies)
      }
    })
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='savedmovies'>
        <SearchForm
          filterMovies={filterMovies}
          required={false}
          page='saved-movies'
        />
        <MoviesCardList
          movies={filteredMovies}
          handleSavedMovie={handleSavedMovie}
          loadingStatus={statusPreloader}
        />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies
