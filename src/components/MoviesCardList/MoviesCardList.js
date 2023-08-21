import React from 'react'
import './MoviesCardList.css'
import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  movies,
  searchRequest,
  statusPreloader,
  handleSavedMovie,
}) {
  return (
    <section className='moviescardlist'>
      {statusPreloader ? (
        <Preloader />
      ) : (
        <ul className='moviescardlist__list'>
          {movies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              handleSavedMovie={handleSavedMovie}
            />
          ))}
          {movies.length === 0 && searchRequest && !statusPreloader && (
            <li>
              <span className='moviescardlist__text'>Ничего не найдено</span>
            </li>
          )}
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList
