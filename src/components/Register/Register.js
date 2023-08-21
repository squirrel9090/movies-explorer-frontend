import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useForms from '../../hooks/useForms'
import Form from '../Form/Form'

function Register({ registerUser, setRegisterError }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const handleOnChange = (evt) => {
    const input = evt.target
    setForm({ ...form, [input.name]: input.value })
  }

  /*const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(form)
    registerUser(form)
  }*/
  //Стейт для почты, имени и пароля
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //Стейт для ошибок заполнения форм
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  //Стейт валидности полей заполнения формы
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  //Стейт для изменения состояний
  const [messageStatus, setMessageStatus] = useState('')
  //Стейт валидности формы
  const [formValid, setFormValid] = useState(false)

  //Проверка валидности полей
  function inputValid() {
    if (!nameValid || !emailValid || !passwordValid) {
      setFormValid(false)
      setMessageStatus('')
      return
    }
    setFormValid(true)
  }

  //заполнение формы
  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log({ name, email, password })
    registerUser({ name, email, password })
  }
  //Отслеживание состояния полей инпутов
  useEffect(() => {
    inputValid()
  }, [name, email, password])

  //Поменять пароль пользователя и проверка формы*/
  function handleChangePassword(evt) {
    setPassword(evt.target.value)
    setMessageStatus('')
    setRegisterError('')

    if (!evt.target.value) {
      setPasswordError('Поле не может быть пустым')
      setPasswordValid(false)
    } else if (evt.target.value.length <= 2) {
      setPasswordError(
        'Длина пароля не может быть меньше 3 и больше 25 символов'
      )
      setPasswordValid(false)
    } else {
      setPasswordError('')
      setPasswordValid(true)
    }
  }

  /**Функция изменения имени пользователя и проверка формы*/
  const handleChangeName = (e) => {
    setName(e.target.value)
    setMessageStatus('')
    setRegisterError('')

    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g

    if (e.target.value.length === 0) {
      setNameError('Поле не может быть пустым')
      setNameValid(false)
    } else if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError('Имя пользователя должно быть длинее 2 и меньше 30')
      setNameValid(false)
    } else if (!nameRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setNameError('Некорректное имя')
      setNameValid(false)
    } else {
      setNameError('')
      setNameValid(true)
    }
  }

  //Поменять почту пользователя и проверить форму
  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
    setMessageStatus('')
    setRegisterError('')
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/

    if (evt.target.value.length === 0) {
      setEmailError('Поле не может быть пустым')
      setEmailValid(false)
    } else if (!emailRegex.test(String(evt.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email')
      setEmailValid(false)
    } else {
      setEmailError('')
      setEmailValid(true)
    }
  }
  return (
    <main className='register'>
      <Form
        header='Добро пожаловать!'
        submit='Зарегистрироваться'
        question='Уже зарегистрированы?'
        link='Войти'
        path='/signin'
        onSubmit={handleSubmit}
      >
        <div className='form__item'>
          <p className='form__item-text'>Имя</p>
          <input
            type='text'
            className='form__field'
            defaultValue='Виталий'
            placeholder='Виталий'
            minLength={2}
            maxLength={12}
            required
            value={name}
            onChange={handleChangeName}
          />
          <p className='form__error'>Что-то пошло не так...</p>
        </div>

        <div className='form__item'>
          <p className='form__item-text'>E-mail</p>
          <input
            type='email'
            className='form__field'
            defaultValue='test@test.ru'
            placeholder='test@test.ru'
            required
            onChange={handleChangeEmail}
            value={email}
          />
          <p className='form__error'>Что-то пошло не так...</p>
        </div>

        <div className='form__item'>
          <p className='form__item-text'>Пароль</p>
          <input
            type='password'
            className='form__field form__field_color-error'
            minLength={3}
            maxLength={25}
            defaultValue='••••••••••••••'
            placeholder='••••••••••••••'
            required
            onChange={handleChangePassword}
            value={password}
          />
          <p className='form__error form__error-display'>
            Что-то пошло не так...
          </p>
        </div>
      </Form>
    </main>
  )
}

export default Register
