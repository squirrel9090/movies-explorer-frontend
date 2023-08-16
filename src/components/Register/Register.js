import Form from '../Form/Form'

function Register() {
  return (
    <main className='register'>
      <Form
        header='Добро пожаловать!'
        submit='Зарегистрироваться'
        question='Уже зарегистрированы?'
        link='Войти'
        path='/signin'
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
