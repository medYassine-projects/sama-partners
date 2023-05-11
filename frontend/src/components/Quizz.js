import React from 'react'
import { Link } from 'react-router-dom'

const Quizz = ({ quizz }) => {
  return (
    <div class='cards'>
      <div className='card-box card-1'>
        <div className='card-box__icon'>
          <i class='fas fa-bolt'></i>
        </div>
        <p className='card-box__exit'>{quizz.categorie?.name}</p>
        <h2 className='card-box__title'>{quizz.name}</h2>
        <p className='card-box__apply'>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/take-quizz/${quizz._id}`}
          >
            <a className='card__link'>
              Apply Now <i class='fas fa-arrow-right'></i>
            </a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Quizz
