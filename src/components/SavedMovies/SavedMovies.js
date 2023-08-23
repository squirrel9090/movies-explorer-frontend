import React, { useState, useEffect } from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getAllFilms } from '../../utils/MainApi'
import { searchMoviesByText } from '../../utils/searchMoviesByText'
import Preloader from '../Preloader/Preloader'

function SavedMovies(props) {
  const { cards = [] } = props
  const [isLoading, setIsLoading] = useState(false)
  const [filterMovies, setFilterMovies] = useState(cards)
  const [filter, setFilter] = useState({
    searchText: '',
    isShortMovies: false,
  })

  useEffect(() => {
    setIsLoading(true)
    getAllFilms()
      .then((data) => {
        setFilterMovies(data)
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
  }, [filter.isShortMovies])

  const handleSearch = () => {
    const result = searchMoviesByText(cards, filter.searchText).filter(
      (cards) => (filter.isShortMovies ? cards.duration < 40 : true)
    )
    setFilterMovies(result)
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header isLoggedIn={props.isLoggedIn} />
          <main className='savedmovies'>
            <SearchForm
              filter={filter}
              onChangeFilter={setFilter}
              onSearch={handleSearch}
            />
            <MoviesCardList cards={filterMovies} buttonMore={false} />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default SavedMovies
