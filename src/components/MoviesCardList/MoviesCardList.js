import React from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
  return (
    <section className='moviescardlist'>
      <ul className='moviescardlist__list'>
        {props.cards.map((card, index) => (
          <MoviesCard key={index} />
        ))}
      </ul>
    </section>
  )
}

export default MoviesCardList
