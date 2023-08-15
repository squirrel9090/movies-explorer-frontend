import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__navigation'>
        <p className='footer__copyright'>&copy; 2023</p>
        <ul className='footer__links'>
          <li className='footer__links-item'>
            <a
              href='https://practicum.yandex.ru'
              className='footer__link link'
              target='_blank'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__links-item'>
            <a
              href='https://github.com/squirrel9090'
              className='footer__link link'
              target='_blank'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
