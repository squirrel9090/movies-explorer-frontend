import React from 'react'
import './CheckBox.css'

export default function CheckBox({ onChange, value, className = '' }) {
  return (
    <div className={`checkbox__toggle ${className}`}>
      <div className='checkbox__tumbler'>
        <input
          id='checkbox'
          type='checkbox'
          className='checkbox__checkbox'
          onChange={(event) => onChange(event.target.checked)}
          checked={value}
        />
        <label htmlFor='checkbox' className='checkbox__slider' />
      </div>
      <p className='checkbox__films'>Короткометражки</p>
    </div>
  )
}
