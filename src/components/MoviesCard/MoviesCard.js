import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { deleteMovie, savedMovie } from '../../utils/MainApi'
import { durationConverter } from '../../utils/durationConverter'

const SaveContext = React.createContext({
  list: [],
  onChange: (f) => f,
})
const MOVIES_API_URL = 'https://api.nomoreparties.co'
const MoviesCard = ({
  card,
  handleSaveCard,
  onLikeCard,
  savedCards,
  onDeleteLikeCard,
}) => {
  const [filterMovies, setFilterMovies] = useState([])
  const savedCard = savedCards.some((item) => item.id === card.id)
  console.log('card:', card)

  // постановка или снятие лайка
  const handleLikeCard = () => {
    if (savedCard) {
      //console.log('love')
      onDeleteLikeCard(card)
    } else {
      onLikeCard(card)
    }
  }

  const btnClass = card.saved
    ? 'card__button_saved card__btn card__button'
    : 'card__button_blank card__btn card__button'

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
      {pathname === '/movies' && (
        <button
          type='button'
          className={btnClass}
          onClick={handleLikeCard}
        ></button>
      )}
      {pathname === '/saved-movies' && (
        <button
          className='card__btn card__btn_delete '
          type='button'
          onClick={handleLikeCard}
        ></button>
      )}
      <div className='card__content'>
        <h2 className='card__name'>{card.nameRU}</h2>

        <p className='card__duration'>{durationConverter(card.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard
