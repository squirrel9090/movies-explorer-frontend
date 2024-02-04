import './Form.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo/header-logo.svg'

function Form({
  header,
  children,
  submit,
  question,
  path,
  link,
  onSubmit,
  isDisable,
}) {
  return (
    <section className='form'>
      <div className='form__container'>
        <Link to='/' className='form__link'>
          <img className='form__logo' src={logo} alt='Логотип'></img>
        </Link>
        <h2 className='form__title'>{header}</h2>
        <form onSubmit={onSubmit} className='form__inputs'>
          <div className='form__items'> {children} </div>
          <button
            type='submit'
            className='form__button button'
            disabled={isDisable}
          >
            {submit}
          </button>
        </form>
        <p className='form__text'>
          {question}
          <Link to={path} className='form__link'>
            {link}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Form
