import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

function Navigation() {
  const [showItems, setShowItems] = useState(false)

  const handleToggleMenu = () => setShowItems(!showItems)
  return (
    <div className='info'>
      <button
        className='info__button button'
        type='button'
        onClick={handleToggleMenu}
      ></button>
      <div
        className={`info__container ${
          showItems ? 'info__container_visible' : ''
        }`}
      >
        <div className='navigation__sidebar'>
          <div className='info__list-container'>
            <button
              className='info__button-close button'
              type='button'
              onClick={handleToggleMenu}
            ></button>
            <ul className='info__list'>
              <li className='info__list-item navigation__list-item_type_main'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `info__link link ${isActive ? 'info__link_active' : ''}`
                  }
                >
                  Главная
                </NavLink>
              </li>
              <li className='info__list-item'>
                <NavLink
                  to='/movies'
                  className={({ isActive }) =>
                    `info__link link ${isActive ? 'info__link_active' : ''}`
                  }
                >
                  Фильмы
                </NavLink>
              </li>
              <li className='info__list-item'>
                <NavLink
                  to='/saved-movies'
                  className={({ isActive }) =>
                    `info__link link ${isActive ? 'info__link_active' : ''}`
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to='/profile'
            className='info__link navigation__link_type_profile'
            activeClassName='navigation__link_active'
          >
            Аккаунт
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navigation
