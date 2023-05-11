import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, ListGroup, Button, Container, Modal } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

import { useDispatch, useSelector } from 'react-redux'
import { deleteEvents } from '../actions/events'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import GalleryModal from './GalleryModal'
require('moment/locale/fr')

const localizer = momentLocalizer(moment)

const DashBoardEvent = () => {
  const [show, setShow] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [galleryShow, setGalleryShow] = useState(false)
  const [ev,setEv] = useState()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const userLogin = useSelector((state) => state.userLogin)
  const userId = userLogin.userInfo.data.id
  const history = useHistory()
  const eventHandler = () => {
    let path = '/create-event'
    history.push(path)
    console.log('access')
  }

  const [refresh, setRefresh] = useState(false)

  const [eventData, setEventData] = useState([])
  const fetchEvents = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/event/byOrganizer/${userId}`
    )
    setEventData(data.data)
  }

  useEffect(() => {
    fetchEvents()
  }, [refresh])
  const dispatch = useDispatch()
  const tableRows = eventData?.map((info, i) => {
    return (
      <tr key={i}>
        <td>{info.title}</td>
        <td>{info.capacity}</td>
        <td>{info.numberOfPlacesLeft}</td>
        <td>
          <Button
            className='btn-danger'
            onClick={() => {
              setEv(info);
              console.log('info',info)
              setGalleryShow(true)
            }}
          >
            <i className='fa fa-thin fa-bookmark'></i>
          </Button>
        </td>
        <td>
          <LinkContainer to={`/event-details/${info._id}`}>
            <Button className='btn-info'>
              <i className='fas fa-edit'></i>
            </Button>
          </LinkContainer>
        </td>
        <td>
          <Button
            className='btn-warning'
            onClick={() => {
              handleClickDelete(info._id)
            }}
          >
            <i className='fas fa-trash'></i>
          </Button>
          <ToastContainer />
        </td>
      </tr>
    )
  })

  const handleClickDelete = (id) => {
    setDeleteId(id)
    setShow(true)
    console.log(id)
  }

  const handleDelete = () => {
    dispatch(deleteEvents(deleteId))
    console.log(deleteId)
    toast.warning('Evenement supprimer avec success', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
    setShow(false)
  }

  return (
    <div>
      <Container className='py-3'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Supprimer un événement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Voulez-vous vraiment supprimer cet événement ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Annulé
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                handleDelete()
                setRefresh(true)
              }}
            >
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <div className='alert alert-dismissible alert-primary'>
            <h4 class='alert-heading' align='center'>
              Votre espace pour créer toujours des belles aventures !
            </h4>
            <p class='mb-0' align='center'>
              Peu importe d'où vous partez, nous allons vous aider !{' '}
              <span role='img' aria-label='happy'>
                🤩
              </span>
            </p>
          </div>
        </Row>

        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Row>
              {' '}
              <Col>
                {' '}
                <h2>Calendrier des événements</h2>
              </Col>
              <Col>
                <Button
                  className='px-5 btn-success'
                  type='button'
                  onClick={eventHandler}
                >
                  Créer une aventure
                </Button>
              </Col>
            </Row>

            <Container>
              <Calendar
                localizer={localizer}
                events={eventData}
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
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <h2>Liste des aventures</h2>
              </Col>
              <Col></Col>

              <Container>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Aventures</th>
                      <th>Capacité</th>
                      <th>Nombre des places restantes</th>
                      <th>Gallerie</th>
                      <th>Edit</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </Table>
              </Container>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <GalleryModal event ={ev}show={galleryShow} onHide={() => setGalleryShow(false)} />
      </Container>
    </div>
  )
}

export default DashBoardEvent
