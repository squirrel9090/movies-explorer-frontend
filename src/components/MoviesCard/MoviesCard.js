import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import Film from '../../images/film.png'
import { MOVIE_HOUR_IN_MINUTES } from '../../utils/constants'
import { deleteMovie, savedMovie } from '../../utils/MainApi'
import { durationConverter } from '../../utils/durationConverter'

const SaveContext = React.createContext({
  list: [],
  onChange: (f) => f,
})
const MOVIES_API_URL = 'https://api.nomoreparties.co'
const MoviesCard = ({ card }) => {
  const { list, onChange } = useContext(SaveContext)
  const savedCard = list.find((item) => item.movieId === card.id)
  const location = useLocation()
  function handleFavoriteToogle() {
    console.log('card:', card)

    savedMovie(card).then((data) => {
      console.log('data', data)
      onChange([...list, data])
    })
  }

  const handleRemove = (id) => {
    return deleteMovie(id).then(() => {
      const updateList = list
        .filter((item) => item.movieId !== card.id)
        .filter((item) => item.movieId !== card.movieId)
      onChange(updateList)
    })
  }

  const { pathname } = useLocation()
  console.log(savedCard)

  return (
    <li className='card'>
      <a
        href={card.trailerLink}
        className='card__link link'
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='card__img'
          alt={card.nameRU}
          src={
            typeof card?.image === 'string'
              ? card?.image
              : MOVIES_API_URL + card.image.url
          }
        />
      </a>
      {location.pathname === '/saved-movies' ? (
        <button
          className='card__btn card__btn_delete '
          type='button'
          onClick={() => handleRemove(card._id)}
        ></button>
      ) : (
        <button
          type='button'
          className={`card__button card__button${
            savedCard ? '_active' : '_inactive'
          }`}
          onClick={handleFavoriteToogle}
        >
          Сохранить
        </button>
      )}
      <div className='card__content'>
        <h2 className='card__name'>{card.nameRU}</h2>

        <p className='card__duration'>{durationConverter(card.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard
