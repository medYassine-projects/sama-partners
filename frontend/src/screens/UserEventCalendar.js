import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Col, Row, Card } from 'react-bootstrap'
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import { useSelector } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
require('moment/locale/fr')

// const locales = {
//   fr: require('moment/locale/fr'),
// }
const localizer = momentLocalizer(moment)

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })

const events = [
  {
    title: 'Camping',
    allDay: true,
    start: new Date(2022, 11, 3),
    end: new Date(2022, 11, 5),
  },
  {
    title: 'Vacance',
    start: new Date(2022, 11, 7),
    end: new Date(2022, 11, 10),
  },
  {
    title: 'Jetski',
    start: new Date(2022, 11, 20),
    end: new Date(2022, 11, 23),
  },
]

const UserEventCalendar = () => {
  const [res, setRes] = useState([])
  const [evs, setEvs] = useState([])
  const [ev, setEv] = useState([])
  const userLogin = useSelector((state) => state.userLogin)
  const userId = userLogin.userInfo.data.id
  const getReservations = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/res/getReservation/byUser/${userId}`
    )
    setRes(data)
    console.log('data:',data)
    /*res.forEach(e => {
      evs.push(e.event)
    });*/
    /* for (let index = 0; index < res.length; index++) {
      const e = res[index];
      ev[index]={title:e.title,start:new Date(e.eventDate), end: new Date(e.endDate)}
    }*/
  }
  useEffect(() => {
    getReservations()
  }, [])

  const history = useHistory()

  const { userInfo } = userLogin

  return (
    <Container className='py-3'>
      <h3>Calendrier des événements à venir</h3>
      <Row>
        <Col md={3} sm={6}>
          {res.length === 0 ? (
            <p>there is no events</p>
          ) : (
            res.map((event, i) => (
              <Card>
                <Card.Title>{event?.title}</Card.Title>
              </Card>
            ))
          )}
        </Col>

        <Col md={9}>
          <Calendar
            localizer={localizer}
            events={res}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500 }}
            messages={{
              next: 'Aprés',
              previous: 'Avant',
              today: "Aujourd'hui",
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default UserEventCalendar
