import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Accordion,
  Modal,
} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import EventMapScreen from '../screens/EventMapScreen'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../actions/events'
import { toast } from 'react-toastify'
import TextEditor from './textEditor'

const initialState = {
  name: '',
  places: '',
  departHour: '',
  eventImage: '',
  capacity: '',
  niveauMin: '',
  duration: '',
  price: '',
  categorie:'',
}


const CreateEventModal = (props) => {
  const [startDate, setStartDate] = useState()
  const [value, onChange] = useState()
  const [formData, setFormData] = useState(initialState)
  const [eventLon, setEventLon] = useState()
  const [eventLat, setEventLat] = useState()
  const [multiple, setMultiple] = useState([])
  const [select, setSelect] = useState()
  const [places, setPlaces] = useState()
  const [date, setDate] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const eventSelect = useSelector((state) => state.createEvent)
  const { loading, error, eventInfo } = eventSelect
  const history = useHistory()
  console.log('props:',props)
  const userId = userLogin.userInfo.data.id
 

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('title', formData.name)
    fd.append('places', places)
    if (startDate==! undefined){    fd.append('eventDate', startDate)
    fd.append('departHour', formData.departHour)}

    fd.append('eventImage', formData.eventImage)
    fd.append('capacity', formData.capacity)
    fd.append('niveauMin', formData.niveauMin)
    fd.append('duration', formData.duration)
    fd.append('price', formData.price)
    fd.append('organizer', userId)
    fd.append('lat', eventLat)
    fd.append('lon', eventLon)
    fd.append('description', formData.description)
    fd.append('select', select)
    fd.append('point_de_depart', formData.point_de_depart)
    fd.append('categorie',formData.categorie)

    /*Object.values(multiple).forEach((file) => {
      fd.append('galerie', file)
    })*/

    // fd.append('point_depart', point_de_depart.display_name)
    /*const roomFormData = new FormData();
    roomFormData.append('name',formData.name);
    roomFormData.append('users',[userId,"6349cbcd0633d6d5b439252e"])*/
    const data = dispatch(createEvent(fd, formData.name, [userId]))

    
  }
  

  const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data?.data)
  }

  useEffect(() => {
    fetchCategories()
    if (eventSelect.created) {
      toast.success('Evenement créer avec success', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
      props.onHide()
    
    } else if (eventSelect.error) {
      toast.error('erreur', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
  }, [eventSelect])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('value2', formData)
  }
  /*const handleMultiple = (e) => {
    setMultiple(e.target.files)
  }*/
  const handlePhoto = (e) => {
    setFormData({ ...formData, eventImage: e.target.files[0] })
  }
  const loc = (l) => {
    //console.log('ken mchet rani m3alem')
    /*setFormData({...formData, places:{display_name:l?.display_name,
                                      lon:l?.lon,
                                      lat:l?.lat}})*/
    //console.log(l)
    setSelect(l)
    //console.log(select)
    setPlaces(l?.display_name)
    setEventLon(l?.lon)
    setEventLat(l?.lat)
    //setFormData({...formData, places:dis})
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Crée un événement
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Information générale</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId='name'>
                      <Form.Label>Titre d'aventure</Form.Label>
                      <Col>
                        <Form.Control
                          name='name'
                          type='text'
                          placeholder='Titre'
                          required
                          onChange={handleChange}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Niveau</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name='niveauMin'
                          type='number'
                          max='5'
                          min='1'
                          placeholder='Niveau min'
                          required
                          onChange={handleChange}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <TextEditor/>
                  <Col md={6}>
                    <Form.Group className='py-2' controlId='desc'>
                      <Form.Label for='textarea'>Description</Form.Label>
                      <Col md={9}>
                        <textarea
                          name='description'
                          className='form-control'
                          id='textarea'
                          rows='3'
                          style={{ fontSize: '14px' }}
                          onChange={handleChange}
                        ></textarea>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='places' className='py-2'>
                      <Form.Label>Nom des lieux à visité</Form.Label>
                      <Col>
                        <Form.Control
                          name='places'
                          type='text'
                          placeholder='lieu(x)'
                          required
                        ></Form.Control>
                        <small>
                          Séparez les lieux avec un , Exemple: "Douz,
                          Matamata..."
                        </small>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <div style={{ width: '100%' }} className='py-3'>
                    <Form.Group controlId='formFileSm' className='mb-3 mt-1'>
                      <Form.Label>
                      Ajouter une image d'événement
                      </Form.Label>
                      <Form.Control
                        type='file'
                        multiple={false}
                        accept='image/*'
                        size='sm'
                        onChange={handlePhoto}
                      />
                    </Form.Group>
                  </div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='1'>
              <Accordion.Header>Details d'événement</Accordion.Header>
              <Accordion.Body>
                <Row>
                  {date ?<>
                  <Button onClick={()=>{setDate(!date)}}>continuer sans date</Button>
                  <Col md={6}>
                    <Form.Group controlId='eventDate'>
                      <Form.Label>Sélectionnez une date</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date = Date) => setStartDate(date)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='departHour'>
                      <Form.Label>Sélectionnez heure de départ</Form.Label>
                      <br />
                      <TimePicker
                        name='departHour'
                        onChange={onChange}
                        value={value}
                        required
                      />
                    </Form.Group>
                  </Col></>:<Button onClick={()=>{setDate(!date)}}>définnir la date</Button>
                   }
                  
                </Row>
                <Row className='py-3'>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Durée :</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name='duration'
                          type='number'
                          min='1'
                          placeholder='Nombre des jours'
                          required
                          onChange={handleChange}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <select
                       name='categorie'
                       className='form-select'
                        id='exampleSelect1'
                        
                        onChange={(e)=>{handleChange(e);
                        console.log(e.target.value,'value')}}>
                        <option disabled selected hidden>
                          Sélectionner une categorie
                        </option>

                        {categories &&
                          categories?.map((el, i) => (
                            <option 
                              name='categorie'
                              key={i} 
                              value={el.value}
                              >
                                {el?.label}
                            </option>
                          ))}
                      </select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Capacité</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name='capacity'
                          type='number'
                          min='1'
                          placeholder='Capacité'
                          required   
                          onChange={handleChange}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Prix :</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Form.Control
                            name='price'
                            type='number'
                            min='1'
                            placeholder='prix'
                            required
                            onChange={handleChange}
                          ></Form.Control>{' '}
                        </Col>
                        <Col>DT $ </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2'>
              <Accordion.Header>Localisation</Accordion.Header>
              <Accordion.Body>
                <EventMapScreen loc={loc} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant='secondary'>
          Close
        </Button>
        <Button type='submit' variant='info'>Créer</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateEventModal
