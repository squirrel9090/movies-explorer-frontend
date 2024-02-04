import React, { useState, useEffect } from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getAllFilms } from '../../utils/MainApi'
import { searchMoviesByText } from '../../utils/searchMoviesByText'
import Preloader from '../Preloader/Preloader'

function SavedMovies({ isLoggedIn, savedCards, onDelete, handleSaveCard }) {
  // Переменные состояния фильмов
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filterMovies, setFilterMovies] = useState([])
  const [filter, setFilter] = useState({
    searchText: '',
    isShortMovies: false,
  })

  useEffect(() => {
    setIsLoading(true)
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || '[]')
    getAllFilms()
      .then((data) => {
        localStorage.setItem('saved-movies', JSON.stringify(data))
        setCards(data)
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
    localStorage.setItem('saved-movies', JSON.stringify(cards))
  }, [handleSaveCard])

  const handleSearch = () => {
    const result = searchMoviesByText(cards, filter.searchText).filter(
      (cards) => (filter.isShortMovies ? cards.duration <= 40 : true)
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
          <main className='savedmovies'>
            <SearchForm
              filter={filter}
              onChangeFilter={setFilter}
              onSearch={handleSearch}
            />
            <MoviesCardList
              cards={filterMovies}
              buttonMore={false}
              savedCards={savedCards}
              onDelete={onDelete}
            />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default SavedMovies
