import React from 'react'
import './AboutProject.css'

function AboutProject() {
  return (
    <section className='aboutproject' id='aboutproject'>
      <h2 className='aboutproject__title'>О проекте</h2>
      <div className='aboutproject__container'>
        <div className='aboutproject__discription'>
          <h3 className='aboutproject__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='aboutproject__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='aboutproject__discription'>
          <h3 className='aboutproject__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='aboutproject__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='aboutproject__timeline'>
        <div className='aboutproject__backend'>
          <h4 className='aboutproject__timeline-title aboutproject__timeline-title_color-green'>
            1 неделя
          </h4>
          <p className='aboutproject__timeline-text'>Back-end</p>
        </div>

        <div className='aboutproject__frontend'>
          <h4 className='aboutproject__timeline-title aboutproject__timeline-title_color-black'>
            4 недели
          </h4>
          <p className='aboutproject__timeline-text'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
