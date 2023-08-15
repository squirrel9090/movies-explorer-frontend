import React from 'react'
import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__links'>
        <li className='portfolio__links-item'>
          <a
            href='https://github.com/squirrel9090/how-to-learn'
            className='portfolio__link link'
            target='_blank'
          >
            <p className='portfolio__subtitle'>Статичный сайт</p>
            <p className='portfolio__arrow'>&#8599;</p>
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a
            href='https://github.com/squirrel9090/russian-travel'
            className='portfolio__link link'
            target='_blank'
          >
            <p className='portfolio__subtitle'>Адаптивный сайт</p>
            <p className='portfolio__arrow'>&#8599;</p>
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a
            href='https://github.com/squirrel9090/react-mesto-api-full-gha'
            className='portfolio__link link'
            target='_blank'
          >
            <p className='portfolio__subtitle'>Одностраничное приложение</p>
            <p className='portfolio__arrow'>&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
