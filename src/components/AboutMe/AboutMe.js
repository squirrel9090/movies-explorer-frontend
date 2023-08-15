import React from 'react'
import './AboutMe.css'
import avatar from '../../images/pic__COLOR_pic.jpg'

function AboutMe() {
  return (
    <section className='aboutme' id='aboutme'>
      <h2 className='aboutme__title'>Студент</h2>
      <div className='aboutme__profile'>
        <div className='aboutme__discription'>
          <h3 className='aboutme__avtor'>Евгения</h3>
          <p className='aboutme__job'>Фронтенд-разработчик, 33 года</p>
          <p className='aboutme__text'>
            Я живу в Кисловодске и недавно закончила курс по
            веб-&nbsp;разработке. Люблю узнавать новое, искать и находить
            решения, что-то создавать. Каждый день стараюсь совершенствовать
            свои навыки, получать новые знания. В свободное время люблю гулять
            по парку и заниматься со своей собакой кинологическим фристайлом
          </p>
          <a
            className='aboutme__link'
            href='https://github.com/squirrel9090'
            target='_blank'
          >
            Github
          </a>
        </div>
        <img className='aboutme__avatar' src={avatar} alt='Аватар' />
      </div>
    </section>
  )
}

export default AboutMe
