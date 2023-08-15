import React from 'react'
import { Link } from 'react-scroll'
import './NavTab.css'

function NavTab() {
  return (
    <section className='navtab'>
      <nav className='navtab__links'>
        <ul className='navtab__list'>
          <li className='navtab__list-item'>
            <Link to='aboutproject' smooth={true} duration={500}>
              <button type='button' className='navtab__link link'>
                О проекте
              </button>
            </Link>
          </li>
          <li className='navtab__list-item'>
            <Link to='techs' smooth={true} duration={500}>
              <button type='button' className='navtab__link link'>
                Технологии
              </button>
            </Link>
          </li>
          <li className='navtab__list-item'>
            <Link to='aboutme' smooth={true} duration={500}>
              <button type='button' className='navtab__link link'>
                Студент
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default NavTab
