import React, { useState, useEffect } from 'react'
import {
  Table,
  Container,
  Col,
  Row,
  Button,
  Form,
  Accordion,
} from 'react-bootstrap'

import axios from 'axios'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import BackArrow from '../components/BackArrow'
import { useDispatch } from "react-redux";
import { updateEvent } from "../actions/events";
import { toast } from 'react-toastify'

const EventDetailsScreen = ({ match }) => {
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
  const [startDate, setStartDate] = useState(new Date())
  const [value, onChange] = useState('10:00')
  const [users, setUsers] = useState([])
  const [desc,setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [duration,setDuration] =useState('')
  const [niveau,setNiveau]=useState('')
  const [eventImage, setEventImage] = useState([]);
  const [select, setSelect] = useState();
  const [cat, setCat] = useState([]);


  const id = match.params.id.toString()

  const [event, setEvent] = useState([])

  const fetchEvent = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKURL}/event/${id}`)
    setEvent(data)
  }
  const dispatch=useDispatch()
  const getUsers = async () => {
    const usersData = await axios.get(
      `${process.env.REACT_APP_BACKURL}/res/getParticipants/${id}`
    )

    setUsers(usersData.data.data)
   
  }

  useEffect(() => {
    fetchEvent()
    getUsers()
  }, [])
  const handleImage = (e) => {
    setEventImage(e.target.files[0])
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    const fd = new FormData()
    if(title){
      fd.append('title',title)}
    if (desc){
      fd.append('description',desc)
    }
    if (duration){
      fd.append('duration',duration)
    }
    if (niveau){
      fd.append('niveauMin',niveau)
    }
    if(eventImage){
      fd.append('eventImage',eventImage)
    }
     axios.put(
      `${process.env.REACT_APP_BACKURL}/event/${id}`,fd).then(()=>{
        toast.success('événement modifier avec succés',{
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
      }).catch((err)=>{
        if (err.response.data.slice(104,162)==='ExtensionError: Only .jpg .jpeg .png images are supported!')
    {
      toast.error(err.response.data.slice(104,162), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })}
    else if (err.response.data.slice(110,131)==='Error: File too large')
    {
      toast.error(err.response.data.slice(110,131), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
  }else {
        toast.error(err,{ 
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,}) }
      })
  };

  const tableRows = users?.map((info, i) => {
    return (
      <tr key={i}>
        <td>{info?.first_name}</td>
        <td>{info?.last_name}</td>
      </tr>
    )
  })

  return (
    <div>
      <Container className='py-3'>
        <BackArrow />

        <Row>
          <Col>
            <h2>Détails de l'évènement</h2>
          </Col>
        </Row>
        <Row>
          <div className='alert alert-dismissible alert-info'>
            <h4 class='alert-heading'>Pour information!</h4>
            <p class='mb-0'>
              Vous ne pouvez pas modifier le prix de l'événement et toute
              modification doit être avant 14 jours de la date de l'événement !
            </p>
          </div>
        </Row>
        <Accordion flush defaultActiveKey='0'>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <h4>Cliquer ici pour modifier votre évènement !</h4>
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                {/** new code **/}
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
                          placeholder={event?.title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name='event-imge'
                          type='file'
                          onChange={handleImage}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
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
                      <Col md={4}>
                        <Form.Control
                          name='capacity'
                          type='number'
                          min='1'
                          placeholder={event.capacity}
                          value={event.capacity}
                          required
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Prix :</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Form.Control
                            name='duration'
                            type='number'
                            min='1'
                            placeholder={event.price}
                            value={event.price}
                            required
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
                          placeholder={event.places}
                          value={event.places}
                          required
                        ></Form.Control>
                        <small>
                          Séparez les lieux avec un , Exemple: "Douz,
                          Matamata..."
                        </small>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Niveau</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          type='number'
                          max='5'
                          min='1'
                          placeholder={event.niveauMin}
                          onChange={(e)=>setNiveau(e.target.value)}
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
                          placeholder={event.duration}
                          value={event.duration}
                          required
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
                        value={event.startDate}
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
                          placeholder={event.description}
                          onChange={(e)=>{setDesc(e.target.value)}}
                        ></textarea>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='departHour' className='py-2'>
                      <Form.Label>Sélectionnez heur de départ</Form.Label>
                      <br />
                      <TimePicker onChange={onChange} value={value} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className='mt-5 px-5 btn-success' type='submit'>
                  Modifier
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Row className='py-5'>
          <h2>Liste des participants</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Row>
      </Container>
    </div>
  )
}

export default EventDetailsScreen
