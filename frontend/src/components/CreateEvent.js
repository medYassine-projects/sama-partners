import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Container, Form, Button, Col, Row, Accordion } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../actions/events'
import BackArrow from './BackArrow'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//000000000import { findById } from '../../backend/models/event'
import '../sass.scss'
import { faB } from '@fortawesome/free-solid-svg-icons'
import EventMapScreen from '../screens/EventMapScreen'

const initialState = {
  name: '',
  places: '',
  departHour: '',
  eventImage: '',
  capacity: '',
  niveauMin: '',
  duration: '',
  price: '',
  categorie: '',
}

const CreateEvent = ({ currentId, setCurrentId }) => {
  const history = useHistory()

  const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data?.data)
  }

  useEffect(() => {
    fetchCategories()
    console.log(categories)
  }, [])

  // const [tags, setTags] = useState([])
  // const removeTags = (indexToRemove) => {
  //   setTags(tags.filter((_, index) => index !== indexToRemove))
  // }

  // const addTags = (e) => {
  //   if (e.target.value !== '') {
  //     setTags([...tags, e.target.value])
  //     e.target.value = ''
  //   }
  // }

  const [startDate, setStartDate] = useState(new Date())
  const [value, onChange] = useState('10:00')
  const [formData, setFormData] = useState(initialState)
  const [eventLon, setEventLon] = useState()
  const [eventLat, setEventLat] = useState()
  const [multiple, setMultiple] = useState([])
  const [select, setSelect] = useState()
  const [places, setPlaces] = useState()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const eventSelect = useSelector((state) => state.createEvent)
  const { loading, error, eventInfo } = eventSelect

  const userId = userLogin.userInfo.data.id
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('title', formData.name)
    fd.append('places', places)
    fd.append('eventDate', startDate)
    fd.append('departHour', formData.departHour)
    fd.append('eventImage', formData.eventImage)
    fd.append('capacity', formData.capacity)
    fd.append('categorie', formData.categorie)
    fd.append('niveauMin', formData.niveauMin)
    fd.append('duration', formData.duration)
    fd.append('price', formData.price)
    fd.append('organizer', userId)
    fd.append('lat', eventLat)
    fd.append('lon', eventLon)
    fd.append('description', formData.description)
    fd.append('select', select)
    fd.append('point_de_depart', formData.point_de_depart)

    /* Object.values(multiple).forEach((file) => {
      fd.append('galerie', file)
    })*/

    // fd.append('point_depart', point_de_depart.display_name)
    /*const roomFormData = new FormData();
    roomFormData.append('name',formData.name);
    roomFormData.append('users',[userId,"6349cbcd0633d6d5b439252e"])*/
    const data = dispatch(createEvent(fd, formData.name, [userId]))

    if (eventSelect.eventInfo) {
      toast.success('Evenement créer avec success', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
      history.push('/dashboard')
    } else if (eventSelect.loading) {
      toast.loading('Evenement se charge', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    } else if (eventSelect.error) {
      toast.error('erreur', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
  }
  const handlePhoto = (e) => {
    setFormData({ ...formData, eventImage: e.target.files[0] })
  }
  const handleMultiple = (e) => {
    setMultiple(e.target.files)
  }
  const notify = () => {
    toast.success('Evenement créer avec success', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  const loc = (l) => {
    /*setFormData({...formData, places:{display_name:l?.display_name,
                                      lon:l?.lon,
                                      lat:l?.lat}})*/
    setSelect(l)
    setPlaces(l?.display_name)
    setEventLon(l?.lon)
    setEventLat(l?.lat)
    //setFormData({...formData, places:dis})
  }
  return (
    <div>
      <Container>
        <BackArrow />
        <h1>Créez une aventure</h1>
        {/* <Button onClick={notify}>check notify</Button> */}

        <Form onSubmit={handleSubmit} className='py-3'>
          {/*new form*/}
          <h3>Information générale de l'événement</h3>
          <hr></hr>
          <Row>
            <Col>
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
            <Col>
              <div style={{ width: '310px' }}>
                <Form.Group controlId='formFileSm' className='mb-3 mt-1'>
                  <Form.Label>Ajouter une image d'événement</Form.Label>
                  <Form.Control
                    type='file'
                    multiple={false}
                    accept='image/*'
                    size='sm'
                    onChange={handlePhoto}
                    required
                  />
                </Form.Group>
              </div>
              {/*<Form.Group>
                <Form.Label>Image</Form.Label>
                <Col md={6}>
                  <Form.Control
                    name='eventImage'
                    type='file'
                    placeholder='Image'
                    onChange={handlePhoto}
                    required
                  ></Form.Control>
                </Col>
  </Form.Group>*/}
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <select
                  name='categorie'
                  className='form-select'
                  id='exampleSelect1'
                  onChange={handleChange}
                >
                  <option value='' disabled selected hidden>
                    Sélectionner une categorie
                  </option>

                  {categories &&
                    categories?.map((el, i) => (
                      <option name='categorie' key={i} value={el.value}>
                        {el?.label}
                      </option>
                    ))}
                </select>
              </Form.Group>
            </Col>

            <Col>
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
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='py-2'>
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

          <h3 className='mt-5'>Détails de l'événement</h3>
          <hr></hr>
          <Row>
            <Col>
              <Form.Group controlId='places'>
                <Form.Label>Nom des lieux à visité</Form.Label>
                <Col>
                  <Form.Control
                    name='places'
                    type='text'
                    placeholder='lieu(x)'
                    required
                    onChange={handleChange}
                  ></Form.Control>
                  <small>
                    Séparez les lieux avec un , Exemple: "Douz, Matamata..."
                  </small>
                </Col>
              </Form.Group>
            </Col>
            <Col>
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
            <Col>
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
            <Col>
              <Form.Group controlId='eventDate'>
                <Form.Label>Sélectionnez une date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date = Date) => setStartDate(date)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='py-2' controlId='desc'>
                <Form.Label for='textarea'>Description</Form.Label>
                <Col md={9}>
                  <textarea
                    name='description'
                    className='form-control'
                    id='textarea'
                    rows='3'
                    onChange={handleChange}
                    required
                  ></textarea>
                </Col>
              </Form.Group>
            </Col>
            <Col>
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
            </Col>
          </Row>

          {/* old form */}
          {/* <Row>
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

              <Form.Group controlId='places'>
                <Form.Label>Nom des lieux à visité</Form.Label>
                <Col>
                  <Form.Control
                    name='places'
                    type='text'
                    placeholder='lieu(x)'
                    required
                    onChange={handleChange}
                  ></Form.Control>
                  <small>
                    Séparez les lieux avec un , Exemple: "Douz, Matamata..."
                  </small>
                </Col>
              </Form.Group>

              <Form.Group className='py-2' controlId='desc'>
                <Form.Label for='textarea'>Description</Form.Label>
                <Col md={9}>
                  <textarea
                    name='description'
                    className='form-control'
                    id='textarea'
                    rows='3'
                    onChange={handleChange}
                  ></textarea>
                </Col>
              </Form.Group>

              <Form.Group className='py-3' controlId='eventDate'>
                <Form.Label>Sélectionnez une date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date = Date) => setStartDate(date)}
                  required
                />
              </Form.Group>

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
            </Col>
            <Col>
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

              <Form.Group>
                <Form.Label>Category</Form.Label>
                <select className='form-select' id='exampleSelect1'>
                  <option value='' disabled selected hidden>
                    Sélectionner une categorie
                  </option>

                  {categories &&
                    categories?.map((el, i) => (
                      <option
                        name='categorie'
                        key={i}
                        value={el.value}
                        onClick={handleChange}
                      >
                        {el?.label}
                      </option>
                    ))}
                </select>
              </Form.Group>

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
          </Row> */}
          {/* <Row>
            <div style={{ width: '800px' }} className='py-3'>
              <Form.Group controlId='formFileSm' className='mb-3 mt-1'>
                <Form.Label>
                  Ajouter des images multiples pour votre événement
                </Form.Label>
                <Form.Control
                  type='file'
                  multiple
                  accept='image/*'
                  size='sm'
                  onChange={handleMultiple}
                />
              </Form.Group>
            </div>
          </Row> */}
          <Row>
            <Accordion className='py-5' defaultActiveKey='0'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>
                  Ajouter une localisation pour votre événement
                </Accordion.Header>
                <Accordion.Body>
                  <EventMapScreen loc={loc} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>
                  Ajouter un lien google map comme un point de rendez-vous
                  <span className='text-secondary mx-3'></span>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Control
                    name='point_de_depart'
                    type='text'
                    placeholder='lien google maps'
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <div align='left'>
            <Button className='mt-5 px-5 btn-success mx-5' type='submit'>
              Crée
            </Button>
            <ToastContainer />
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default CreateEvent
