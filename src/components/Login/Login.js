import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Form from '../Form/Form'

function Login({ onLogin, loginError /*setLoginError*/ }) {
  /**Переменные состояния полей почты и пароля*/
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  /**Переменные состояния ошибок при заполнении полей*/
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  /**Переменные валидности полей при заполнении*/
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  /**Переменная состояния статуса изменений*/
  const [messageStatus, setMessageStatus] = useState('')
  /**Переменная состония валидности формы*/
  const [formValid, setFormValid] = useState(false)

  /**Функция изменения имени пользователя и проверка формы*/
  function handleChangeEmail(e) {
    setEmail(e.target.value)
    setMessageStatus('')
    /*setLoginError('')*/
    const re = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/

    if (e.target.value.length === 0) {
      setEmailError('Поле не может быть пустым')
      setEmailValid(false)
    } else if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный email')
      setEmailValid(false)
    } else {
      setEmailError('')
      setEmailValid(true)
    }
  }

  /**Функция изменения пароля пользователя и проверка формы*/
  function handleChangePassword(e) {
    setPassword(e.target.value)
    setMessageStatus('')
    /*setLoginError('')*/

    if (!e.target.value) {
      setPasswordError('Поле не может быть пустым')
      setPasswordValid(false)
    } else if (e.target.value.length <= 2) {
      setPasswordError(
        'Длина пароля не может быть меньше 3 и больше 25 символов'
      )
      setPasswordValid(false)
    } else {
      setPasswordError('')
      setPasswordValid(true)
    }
  }

  /**Функция проверки валидности полей*/
  function inputValid() {
    if (!emailValid || !passwordValid) {
      setFormValid(false)
      return
    }
    setFormValid(true)
  }

  /**Функция сохранения формы*/
  function handleSubmit(e) {
    e.preventDefault()
    onLogin({ email, password })
  }

  /**Отслеживание состояния полей инпутов*/
  useEffect(() => {
    inputValid()
  }, [email, password])

  return (
    <main className='login'>
      <Form
        header='Рады видеть!'
        submit='Войти'
        question='Ещё не зарегистрированы?'
        link='Регистрация'
        path='/signup'
        onSubmit={handleSubmit}
      >
        <div className='form__item'>
          <p className='form__item-text'>E-mail</p>
          <input
            type='email'
            className='form__field'
            placeholder='email'
            required
            name='email'
            value={email}
            onChange={handleChangeEmail}
          />
          <p className='form__error'>{emailError}</p>
        </div>

        <div className='form__item'>
          <p className='form__item-text'>Пароль</p>
          <input
            type='password'
            className='form__field form__field_color-error'
            minLength={3}
            maxLength={25}
            placeholder='пароль'
            required
            value={password}
            onChange={handleChangePassword}
          />
          <p className='form__error form__error-display'>{passwordError}</p>
        </div>
      </Form>
    </main>
  )
}

export default Login
