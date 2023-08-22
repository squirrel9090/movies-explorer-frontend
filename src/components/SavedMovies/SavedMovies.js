import React, { useState, useEffect } from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { setToken, getAllFilms, deleteMovie } from '../../utils/MainApi'
import { SHORT_MOVIE_DURATION } from '../../utils/constants'
import { searchMoviesByText } from '../../utils/searchMoviesByText'

function SavedMovies(props) {
  const { movies = [] } = props
  const [filterMovies, setFilterMovies] = useState(movies)
  const [filter, setFilter] = useState({
    searchText: '',
    isShortMovies: false,
  })

  useEffect(() => {
    handleSearch(filter)
  }, [filter.isShortMovies])

  const handleSearch = () => {
    const result = searchMoviesByText(movies, filter.searchText).filter(
      (movie) => (filter.isShortMovies ? movie.duration < 40 : true)
    )
    setFilterMovies(result)
  }

  return (
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
  )
}

export default SavedMovies
