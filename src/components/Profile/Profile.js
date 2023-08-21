import './Profile.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext'

const Profile = (props) => {
  const { isLoggedIn, onUpdateUser, logOut, profileMessage } = props
  const currentUser = useContext(CurrentUserContext)

  const [initChange, setInitChange] = useState(false)

  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  /**Переменная состояния валидности формы*/
  const [formValid, setFormValid] = useState(false)
  /**Переменная состояния кнопки*/
  const [buttonDisabled, setButtonDisabled] = useState(true)
  /**Переменная состояния успешного результата*/
  const [updateForm, setUpdateForm] = useState()

  const navigate = useNavigate()

  /**После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.*/
  useEffect(() => {
    setButtonDisabled(currentUser.name === name && currentUser.email === email)
  }, [name, email, currentUser.name, currentUser.email])

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [currentUser.name, currentUser.email])

  function handleClickEditButton(event) {
    event.preventDefault()
    setInitChange(true)
  }

  function handleChangeName(e) {
    setInitChange(true)
    setName(e.target.value)
    if (
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
    ) {
      setFormValid(false)
      setNameError('Имя должно отличаться от установленного')
    } else {
      setNameError(e.target.validationMessage)
      setFormValid(e.target.closest('form').checkValidity())
      setUpdateForm('')
    }
  }

  function handleChangeEmail(e) {
    setInitChange(true)
    setEmail(e.target.value)
    if (
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
    ) {
      setFormValid(false)
      setEmailError('Email должен отличаться от установленного')
    } else {
      setEmailError(e.target.validationMessage)
      setFormValid(e.target.closest('form').checkValidity())
      setUpdateForm('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({ name, email }, setUpdateForm)
    setInitChange(false)
  }

  return (
    <main className='profile'>
      <section className='profile_container'>
        <form className='profile__form' onSubmit={handleSubmit}>
          <h3 className='profile__greeting'>Привет, {name}!</h3>
          <div className='profile__inputs'>
            <p className='profile__text'>Имя</p>
            <div className='profile__area profile__area_type_name'>
              <input
                className='profile__settings'
                type='text'
                name='name'
                placeholder='Ваше имя'
                minLength={2}
                maxLength={12}
                required
                value={name}
                onChange={handleChangeName}
              />
            </div>
            <span className='profile__error'>{nameError}</span>
            <div className='profile__area profile__area_type_email'>
              <input
                className='profile__settings'
                type='email'
                name='email'
                placeholder='Ваш email'
                required
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <p className='profile__text'>E-mail</p>
          </div>
          <span className='profile__error'>{emailError}</span>
          <span className='profile__error'>{profileMessage}</span>
        </form>
        <form className='profile__form' action='/profile'>
          {initChange ? (
            <button
              className={`profile__button profile__btn_submit button ${
                formValid ? '' : 'profile__btn_submit_disabled'
              }`}
              type='submit'
              onClick={handleSubmit}
              disabled={!formValid || buttonDisabled}
            >
              Сохранить
            </button>
          ) : (
            <>
              <input
                type='submit'
                className='profile__button'
                value='Редактировать'
                onClick={handleClickEditButton}
              />
              <Link to='/' className='profile__link' onClick={logOut}>
                Выйти из аккаунта
              </Link>
            </>
          )}
        </form>
      </section>
    </main>
  )
}

export default Profile
