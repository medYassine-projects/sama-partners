import React from 'react'
import { Link } from 'react-router-dom'
import image from '../images/hicking.jpg'
import '../sass.scss'

const EventCard = ({ event }) => {
  
  const urlImage = event?.eventImage?.slice(8, event?.eventImage?.length)
  const ind = event.places[0].indexOf(',')
  var p =''
  ind>0 ? p=event.places[0].substring(0,ind) : p=event.places[0]
  console.log('month',new Date(event.eventDate).getMonth())
  let date, month, year;
  date = new Date(event.eventDate).getDate();
  month = new Date(event.eventDate).getMonth() + 1; // take care of the month's number here ⚠️
  year = new Date(event.eventDate).getFullYear();
  if (date < 10) {
    date = '0' + date;
  }
  
  if (month < 10) {
    month = '0' + month;
  }
  date = date
  .toString()
  .padStart(2, '0');

  month = month
  .toString()
  .padStart(2, '0');
  return (
    <div>
      <ul>
        <li
          class='booking-card'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            backgroundImage: `url(${process.env.REACT_APP_BACKURL}/${urlImage})`,
          }}
        >
          <div class='book-container'>
            <div class='content'>
              <Link to={`/event/${event._id}`}>
                {' '}
                <button class='btn'>Réserver</button>
              </Link>
            </div>
          </div>
          <div class='informations-container'>
            <h2 class='title'>{event.title}</h2>
            <p class='sub-title'>
              Places réstantes: {event.numberOfPlacesLeft}
            </p>
            <p class='sub-title'>{event.duration} jours</p>
            <p class='price'>
              <svg
                class='icon'
                style={{ width: '24px', height: '24px' }}
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z'
                />
              </svg>
              {event.price}
            </p>
            <div class='more-information'>
              <div class='info-and-date-container'>
                <div class='box info'>
                  <svg
                    class='icon'
                    style={{ width: '24px', height: '24px' }}
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z'
                    />
                  </svg>
                  <p>{p}</p>
                </div>
                {event.eventDate ? <div class='box date'>
                  <svg
                    class='icon'
                    style={{ width: '24px', height: '24px' }}
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z'
                    />
                  </svg>
                  <p>{`${date}/${month}/${year}`}</p>
                  </div> : <div class='box date'><svg
                    class='icon'
                    style={{ width: '24px', height: '24px' }}
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z'
                    /> </svg><p>à venir</p></div>}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default EventCard
