import './Profile.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <main className='profile'>
      <section className='profile_container'>
        <form className='profile__form'>
          <h3 className='profile__greeting'>Привет, Виталий!</h3>
          <div className='profile__inputs'>
            <p className='profile__text'>Имя</p>
            <div className='profile__area profile__area_type_name'>
              <input
                className='profile__settings'
                defaultValue='Виталий'
                placeholder='Виталий'
                minLength={2}
                maxLength={12}
                required
              />
            </div>
            <div className='profile__area profile__area_type_email'>
              <input
                className='profile__settings'
                defaultValue='test@test.ru'
                placeholder='test@test.ru'
                required
              />
            </div>
            <p className='profile__text'>E-mail</p>
          </div>
        </form>
        <form className='profile__form' action='/profile'>
          <input
            type='submit'
            className='profile__button'
            value='Редактировать'
          />
        </form>
        <Link to='/' className='profile__link'>
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  )
}

export default Profile
