import React, { useState, useRef, useEffect } from 'react'
import './SearchForm.css'

function SearchForm({ filterMovies, required = true, page }) {
  /**переменная состояния кнопки поиска*/
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  /**переменная состояния ошибки*/
  const [error, setError] = useState({ name: '', shortMovie: '' })
  /*Переменная состония поисковой строки*/
  const [value, setValue] = useState({ name: '', shortMovie: false })

  const formRef = useRef(null)

  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('search-movies'))
    if (searchMovies) {
      setValue(searchMovies)
      filterMovies(searchMovies)
    }
    if (page === 'saved-movies') {
      filterMovies({ name: '', shortMovie: false })
      setValue({ name: '', shortMovie: false })
    }
  }, [])

  const handleInputChange = (evt) => {
    const { name, value: inputValue, validationMessage } = evt.target

    const updatedValue = {
      ...value,
      [name]: inputValue,
    }
    if (page === 'movies') {
      localStorage.setItem('search-movies', JSON.stringify(updatedValue))
    }
    setValue(updatedValue)
    setError((state) => ({ ...state, [name]: validationMessage }))
    setIsDisabledButton(!formRef.current.checkValidity())
  }

  const handleCheckbox = (evt) => {
    const { name, checked } = evt.target
    const updatedValue = { ...value, [name]: checked }

    if (page === 'movies') {
      localStorage.setItem('search-movies', JSON.stringify(updatedValue))
    }
    setValue(updatedValue)
    filterMovies(updatedValue)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    filterMovies(value)
  }

  return (
    <section className='seachform'>
      <form
        className='seachform__input-container'
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <input
          className='seachform__input'
          placeholder='Фильм'
          required={required}
          onChange={handleInputChange}
          value={value.name}
          name='name'
        ></input>
        <button
          className={`seachform__btn button ${
            isDisabledButton ? 'searchform__btn_disabled' : ''
          }`}
          disabled={isDisabledButton}
          type='submit'
          onClick={handleSubmit}
        ></button>
      </form>
      <span className='searchform__span'>{error.name}</span>
      <div className='seachform__checkbox-container'>
        <input
          type='checkbox'
          className='seachform__checkbox'
          id='seachform__checkbox'
          name='shortMovie'
          onChange={handleCheckbox}
          checked={value.shortMovie}
        ></input>
        <label className='seachform__label link' htmlFor='seachform__checkbox'>
          Короткометражки
        </label>
      </div>
    </section>
  )
}

export default SearchForm
