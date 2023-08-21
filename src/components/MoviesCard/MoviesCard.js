import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { MOVIE_HOUR_IN_MINUTES } from '../../utils/constants'

function MoviesCard({ movie, handleSavedMovie }) {
  const location = useLocation()

  const btnClass = movie.saved
    ? 'card__btn_saved card__btn button'
    : 'card__btn__blank card__btn button'

  const hourDuration =
    movie.duration >= MOVIE_HOUR_IN_MINUTES
      ? `${Math.floor(movie.duration / MOVIE_HOUR_IN_MINUTES)} ч `
      : ''
  const minuteDuration =
    movie.duration === MOVIE_HOUR_IN_MINUTES
      ? ''
      : `${movie.duration % MOVIE_HOUR_IN_MINUTES} м`
  const movieDuration = hourDuration + minuteDuration

  const savedMovie = () => handleSavedMovie(movie)

  return (
    <li className='card'>
      <a
        href={movie.trailerLink}
        className='card__link link'
        target='_blank'
        rel='noreferrer'
      >
        <img className='card__img' alt={movie.nameRU} src={movie.thumbnail} />
      </a>
      <div className='card__content'>
        <h2 className='card__name'>{movie.nameRU}</h2>
        {location.pathname === '/movies' && (
          <button
            className={btnClass}
            type='button'
            onClick={savedMovie}
          ></button>
        )}
        {location.pathname === '/saved-movies' && (
          <button
            className='card__btn card__btn_delete button'
            type='button'
            onClick={savedMovie}
          ></button>
        )}
      </div>
      <p className='card__duration'>{movieDuration}</p>
    </li>
  )
}

export default MoviesCard
