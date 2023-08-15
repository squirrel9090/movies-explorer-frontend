import './NavAuth.css'
import { Link } from 'react-router-dom'

function NavAuth() {
  return (
    <nav className='nav-auth'>
      <ul className='nav-auth__links'>
        <li className='nav-auth__link-item'>
          <Link
            to='/sign-up'
            className='nav-auth__link nav-auth__link_type_signup'
          >
            Регистрация
          </Link>
        </li>
        <li className='auth__link-item'>
          <Link
            to='/sign-in'
            className='nav-auth__link nav-auth__link_type_signin'
          >
            {' '}
            <button className='nav-auth__button button' type='button'>
              Войти
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavAuth
