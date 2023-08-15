import { NavLink } from 'react-router-dom'
import './Info.css'

export default function Info({ onClick }) {
  return (
    <div className='info'>
      <div className='info__container'>
        <NavLink
          to='/movies'
          className={({ isActive }) =>
            `info__link link ${isActive ? 'info__link_active' : ''}`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to='/saved-movies'
          className={({ isActive }) =>
            `info__link link ${isActive ? 'info__link_active' : ''}`
          }
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <NavLink to='/profile' className='info__account' onClick={onClick}>
        <button className='info__profile-button button' type='button'>
          Аккаунт
        </button>
      </NavLink>
    </div>
  )
}
