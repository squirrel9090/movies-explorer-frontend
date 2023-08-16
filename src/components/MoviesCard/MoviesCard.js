import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import Film from '../../images/film.png'

function MoviesCard() {
  const location = useLocation()

  return (
    <li className='card'>
      <a
        href='https://www.youtube.com/watch?v=_zIK7IloRM4'
        className='card__link link'
        target='_blank'
        rel='noreferrer'
      >
        <img className='card__img' src={Film} alt='Фотография из фильма' />
      </a>
      {location.pathname === '/movies' && (
        <button
          className='card__btn card__btn__blank button'
          type='button'
        ></button>
      )}
      {location.pathname === '/saved-movies' && (
        <button className='card__btn card__btn_delete ' type='button'></button>
      )}
      <div className='card__content'>
        <h2 className='card__name'>33 слова о дизайне</h2>

        <p className='card__duration'>1ч 42м</p>
      </div>
    </li>
  )
}

export default MoviesCard
