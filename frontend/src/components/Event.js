import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

const Event = ({ event }) => {
  return (
    <Card style={{ maxWidth: '22rem' }}>
      <Link to={`/event/${event._id}`}>
        <div className='img-container'>
          <Card.Img
            src={event.image}
            fluid
            variant='top'
            className='hover-zoom'
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/event/${event._id}`}>
          <Card.Title as='div'>
            <strong>{event.name}</strong>
          </Card.Title>
        </Link>
        <Row>
          <Col align='center'>
            <Card.Text as='div' className='text-xs'>
              <strong>Date</strong>
            </Card.Text>
          </Col>
          <Col align='center'>
            <Card.Text as='div' className='text-xs'>
              <strong>Durée</strong>
            </Card.Text>
          </Col>
          <Col align='center'>
            <Card.Text as='div' className='text-xs'>
              <strong>Niveau</strong>
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Col align='center'>
            <Card.Text as='div' className='text-xs'>
              {event.eventDate}
            </Card.Text>
          </Col>
          <Col align='center'>
            <Card.Text as='div' className='text-xs'>
              {event.duration}
            </Card.Text>
          </Col>
          <Col align='center'>
            <Card.Text as='div' className='text-xs'>
              {event.niveauMin}
            </Card.Text>
          </Col>
        </Row>
        <br />
        <Row>
          <Card.Text align='right'>
            Prix:{' '}
            <span className='p-1 mb-5 bg-success text-light rounded'>
              {event.price} .dt
            </span>
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Event
