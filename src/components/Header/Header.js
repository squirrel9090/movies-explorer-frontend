import React from 'react'
import './Header.css'
import headerLogo from '../../images/logo/header-logo.svg'
import { Link, useLocation } from 'react-router-dom'
import Info from '../Info/Info'
import NavAuth from '../NavAuth/NavAuth'

const Header = ({ loggedIn }) => {
  const location = useLocation()
  return (
    <header className='header'>
      <Link to='/' className='header__link header__link_logo link'>
        {<img className='header__logo' src={headerLogo} alt='Логотип' />}
      </Link>
      {!loggedIn && <NavAuth />}
      {loggedIn && <Info />}
    </header>
  )
}

export default Header
