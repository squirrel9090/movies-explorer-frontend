import './MoviesCardList.css'
import React, { useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

const MoviesCardList = ({ cards = [], isCanLoadMore = true }) => {
  const [showCount, setShowCount] = useState(0)

  const canLoadMore = isCanLoadMore && showCount < cards.length

  useEffect(() => {
    setShowCount(9)
  }, [cards])

  useEffect(() => {
    shownCount()
  }, [])

  function shownCount() {
    const display = window.innerWidth
    if (display > 1180) {
      setShowCount(15)
    } else if (display > 1023) {
      setShowCount(12)
    } else if (display > 800) {
      setShowCount(8)
    } else if (display < 800) {
      setShowCount(5)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', shownCount)
    return () => window.removeEventListener('resize', shownCount)
  })

  const handleLoadMore = () => {
    const display = window.innerWidth
    if (display > 1180) {
      setShowCount((value) => value + 3)
    } else if (display > 1023) {
      setShowCount((value) => value + 3)
    } else if (display < 1023) {
      setShowCount((value) => value + 2)
    }
  }

  const Cards = cards.slice(0, showCount)

  return (
    <section className='cards'>
      {Cards.length ? (
        <ul className='moviescardlist__list'>
          {Cards.map((card) => (
            <MoviesCard key={card._id} card={card} />
          ))}
        </ul>
      ) : (
        <div className='cards__placeholder'>Ничего не найдено</div>
      )}
      {canLoadMore && (
        <div className='cards__button-container'>
          <button
            className='cards__button'
            type='button'
            name='more'
            onClick={handleLoadMore}
          >
            Ещё
          </button>
        </div>
      )}
    </section>
  )
}

export default MoviesCardList
