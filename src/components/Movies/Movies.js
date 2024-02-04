import React, { useState, useEffect, useMemo } from 'react'
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getAllMovies } from '../../utils/MoviesApi'
import { DISPLAY_SETTINGS } from '../../utils/constants'
import { searchMoviesByText } from '../../utils/searchMoviesByText'
import Preloader from '../Preloader/Preloader'

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

function Movies(props) {
  const { isLoggedIn, onLikeCard, onDelete, savedCards } = props

  const [isLoading, setIsLoading] = useState(false)
  const [cards, setMovies] = useState([])
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

  /**обновить локальное хранилище при изменении состояния movies*/
  useEffect(() => {
    localStorage.setItem('local-movies', JSON.stringify(cards))
  }, [cards])

  useEffect(() => {
    setIsLoading(true)
    getAllMovies()
      .then((data) => {
        setMovies(data)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    handleSearch(filter)
  }, [cards])

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
    const result = searchMoviesByText(cards, filter.searchText).filter(
      (movie) => (filter.isShortMovies ? movie.duration < 40 : true)
    )
    setFilterMovies(result)
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <main className='movies'>
            <SearchForm
              filter={filter}
              onChangeFilter={setFilter}
              onSearch={handleSearch}
              page='movies'
            />
            <MoviesCardList
              cards={filterMovies}
              savedCards={savedCards}
              onLikeCard={onLikeCard}
              onDelete={onDelete}
            />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default Movies
