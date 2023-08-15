import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

function NotFound() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <section className='notfound'>
      <h1 className='notfound__title'>404</h1>
      <p className='notfound__subtitle'>Страница не найдена</p>
      <Link onClick={goBack} className='notfound__link'>
        Назад
      </Link>
    </section>
  )
}

export default NotFound
