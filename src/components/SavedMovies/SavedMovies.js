import React from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.isLoggedIn} />
      <main className='savedmovies'>
        <SearchForm />
        <MoviesCardList cards={props.cards} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies
