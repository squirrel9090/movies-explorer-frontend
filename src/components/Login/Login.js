import Form from '../Form/Form'

function Login() {
  return (
    <main className='login'>
      <Form
        header='Рады видеть!'
        submit='Войти'
        question='Ещё не зарегистрированы?'
        link='Регистрация'
        path='/signup'
      >
        <div className='form__item'>
          <p className='form__item-text'>E-mail</p>
          <input
            type='email'
            className='form__field'
            defaultValue='test@test.ru'
            placeholder='test@test.ru'
            required
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
            placeholder='пароль'
            required
          />
          <p className='form__error form__error-display'>
            Что-то пошло не так...
          </p>
        </div>
      </Form>
    </main>
  )
}

export default Login
