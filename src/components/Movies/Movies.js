import React, { useState, useEffect, useMemo } from 'react'
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getAllMovies } from '../../utils/MoviesApi'
import {
  getAllFilms,
  setToken,
  deleteMovie,
  savedMovie,
} from '../../utils/MainApi'
import { DISPLAY_SETTINGS, SHORT_MOVIE_DURATION } from '../../utils/constants'
import { searchMoviesByText } from '../../utils/searchMoviesByText'

const moviesDisplay = () => {
  const display = { ...DISPLAY_SETTINGS.default }
  if (window.innerWidth < 990) {
    display.start = DISPLAY_SETTINGS.pad.start
    display.load = DISPLAY_SETTINGS.pad.load
  }
  if (window.innerWidth < 767) {
    display.start = DISPLAY_SETTINGS.mobile.start
    display.load = DISPLAY_SETTINGS.mobile.load
  }
  return display
}

function Movies({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([])
  const [filter, setFilter] = useState(() => {
    const savedFilter = window.localStorage.getItem('filter')
    const result = JSON.parse(savedFilter)
    return (
      result || {
        searchText: '',
        isShortMovies: false,
      }
    )
  })

  useEffect(() => {
    setIsLoading(true)
    getAllMovies()
      .then((data) => {
        setMovies(data)
      })
      .then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    handleSearch(filter)
  }, [movies])

  useEffect(() => {
    handleSearch(filter)
  }, [filter.isShortMovies])

  useEffect(() => {
    window.localStorage.setItem('filter', JSON.stringify(filter))
  }, [filter])

  const isSearchMode = useMemo(() => {
    return !!filter.searchText || filter.isShortMovies
  }, [filter])

  const handleSearch = () => {
    const result = searchMoviesByText(movies, filter.searchText).filter(
      (movie) => (filter.isShortMovies ? movie.duration < 40 : true)
    )
    setFilterMovies(result)
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='movies'>
        <SearchForm
          filter={filter}
          onChangeFilter={setFilter}
          onSearch={handleSearch}
          page='movies'
        />
        <MoviesCardList cards={filterMovies} />
      </main>
      <Footer />
    </>
  )
}

export default Movies
