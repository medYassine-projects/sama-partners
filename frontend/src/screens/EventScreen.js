import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Carousel,
  Form,
  Collapse,
  Badge,
} from 'react-bootstrap'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Slider from '../components/Slider'
import moment from 'moment'
import { listEventDetails } from '../actions/events'
import Message from '../components/Message'
import Loader from '../components/Loader'
import  ReservationModal  from '../components/ReservationModal'
import maps from '../images/maps.png'
import { createRes } from '../api/index'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import EventMap from '../components/EventMap'
import Maps from '../components/Maps'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import { Icon } from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { ToastContainer, toast } from 'react-toastify'
import authHeader from '../api/auth-header'
import socketIO from 'socket.io-client'
var socket, selectedChatCompare
const config = { headers: authHeader() }

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
]

//const position = [51.505, -0.09]

const EventScreen = ({ history, match }) => {
  const [open, setOpen] = useState(null)
  const [plc, setPlc] = useState(1)
  const [msgId, setMsgId] = useState()
  const [content, setContent] = useState()
  const [event, setEvent] = useState([])
  const [chat, setChat] = useState([])
  const [chatId, setChatId] = useState()
  const [refresh, setRefresh] = useState(false)
  const [reply, setReply] = useState()
  const [position, setPosition] = useState()
  const [modalShow, setModalShow] = useState(false);

  const clickHandler = (index, id) => {
    setOpen((prev) => {
      return prev === index ? null : index
    })
    setMsgId(id)
    console.log('clicked', index)
  }

  const dispatch = useDispatch()

  //const eventDetails = useSelector((state) => state.eventDetails)
  //const { loading, error, event } = eventDetails

  // const event = events.find((e) => e._id === match.params.id)

  //axios.defaults.baseURL = 'http://127.0.01:3030'
  const fetchEvent = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/event/${match.params.id}`
    )
    setEvent(data)
    if (!!data.lon && !!data.lat) {
      setPosition([data.lat, data.lon])
    } else {
      setPosition(null)
    }
    user?.userInfo?.data?.passedQuizes.map((q, i) => {
      if (q?.quiz?.categorie === data.categorie && q.score < data.niveauMin) {
        toast.warning('cet aventure demande un niveau supérieur à le votre', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
      }
    })

    localStorage.setItem('event', JSON.stringify({ ...data }))
    const dataChat = await axios.get(
      `${process.env.REACT_APP_BACKURL}/message/${data.chat._id}`
    )
    setChatId(data.chat._id)
    setChat(dataChat?.data)
    socket.emit('setup', data.chat._id)
  }

  const user = useSelector((state) => state.userLogin)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user?.userInfo?.data)
    if (user?.userInfo?.data) {
      await axios
      .post(
        `${process.env.REACT_APP_BACKURL}/message/${user.userInfo.data.id}`,
        {
          content: content,
          chatId: chatId,
        }
      )
      .then((data) => {
        socket.emit('message sent', data)
        setRefresh(!refresh)
      })

    document.getElementById('textareacomment').value = ''
    //setRefresh(true)
    //setRefresh(false)
    }
    else{
      toast.error('Veuillez vous connecter', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
   
  }

  useEffect(() => {
    socket = socketIO(`${process.env.REACT_APP_BACKURL}/`)
    fetchEvent()
  }, [refresh])
  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if (newMessageReceived.data.chatId._id === chatId) {
        console.log('received:  ', newMessageReceived)
        chat?.data?.push(newMessageReceived.data)
        setRefresh(!refresh)
      }
    })
    socket.on("mess deleted",(msg)=>{
      console.log("del",msg)
      console.log('chat1',chat.data)
      const index = chat?.data?.indexOf(msg);
        if (index > -1) { // only splice array when item is found
          chat?.data?.splice(index, 1); // 2nd parameter means remove one item only
          console.log('chat',chat.data)  
        }
    })
  })
  const [disabled, setDisabled] = useState(false)
  
  const dateLimit = moment(event.eventDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  const now = moment()
  //console.log('now:',now.isAfter(dateLimit));
  //console.log('date limite',dateLimit.isValid())
  //console.log(dateLimit.isValid() < now.isAfter(dateLimit))
  const addToCartHandler = () => {
   
    setModalShow(true)
    //history.push(`/panier/${match.params.id}?plc=${plc}`)
    
    if (dateLimit.isValid() !== now.isAfter(dateLimit)) {
      setDisabled(true)
    }
  }

  const handleReplySubmit = async (e) => {
    e.preventDefault()
    await axios.post(
      `${process.env.REACT_APP_BACKURL}/reply/${user.userInfo.data.id}`,
      {
        content: reply,
        messageId: msgId,
      }
    )
    document.getElementById('textareareplycomment').value = ''
    setRefresh(true)
    setRefresh(false)
  }
  var momentString=''
  if (event.eventDate){
    const momentObj = moment(event.eventDate)
    momentString = momentObj.format('YYYY-MM-DD')
  }
  else {
    momentString='à venir'
  }
    



  const handleDeleteComment = (msg) => {
    axios
      .delete(`${process.env.REACT_APP_BACKURL}/message/delete/${msg._id}`)
      .then((res) => {
        console.log('supp:',res)
        socket.emit('message deleted',res)
        toast.success('Commentaire supprimé avec succès', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
        setRefresh(!refresh)
      })
  }

  return (
    <div>
      {event && event.length !== 0 ? (
        <img
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={`${process.env.REACT_APP_BACKURL}/${event.eventImage.slice(
            8,
            event.eventImage.length
          )}`}
        />
      ) : (
        <Loader />
      )}
      <ReservationModal
      show = {modalShow}
      id = {match.params.id}
      onHide={() => setModalShow(false)}
      plc = {plc}
      />
      <Container>
        <h1 className='py-3'>{event.name}</h1>
        <h1>{event.title}</h1>
        <hr></hr>
        {/* Inscription Card */}
        <Row>
          <Col md={8}>
            <div>
              <Badge pill bg='light'>
                <i className='fa fa-solid fa-user'></i> Organiser par:{' '}
                {event?.organizer?.first_name} {event?.organizer?.last_name}
              </Badge>{' '}
              <Badge pill bg='info'>
                <i className='fa fa-light fa-calendar-days'></i> Date:{' '}
                {momentString}
              </Badge>{' '}
              <Badge pill bg='success'>
                Durée : {event.duration} jours
              </Badge>{' '}
              <Badge pill bg='warning'>
                <i className='fa fa-solid fa-turn-up'></i> Niveau :{' '}
                {event.niveauMin}
              </Badge>
            </div>
            <div className='py-3'>
              <h3>Description</h3>
              <p>{event.description}</p>
            </div>
            <hr></hr>
            <div style={{ height: '400px' }}>
              <h3>Localisation</h3>

              {!!position && (
                <div
                  style={{
                    border: '2px solid black',
                    width: '100%',
                    height: '80%',
                  }}
                >
                  <MapContainer
                    center={[event.lat, event.lon]}
                    zoom={10}
                    scrollWheelZoom={false}
                    style={{ width: '100%', height: '100%' }}
                    zoomControl={false}
                    dragging={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker
                      position={[52.6376, -1.135171]}
                      icon={
                        new Icon({
                          iconUrl: markerIconPng,
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                        })
                      }
                    >
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}

              <div style={{ textAlign: 'center' }} className='py-3'>
                <h5>Ovrir avec Google Maps</h5>
                <a
                  style={{ height: '104px', width: '64px' }}
                  href={event.googleMapsUrl}
                  target='_blank'
                >
                  <i
                    className='fa fa-light fa-map-location-dot'
                    style={{ height: '100%', width: '100%' }}
                  ></i>
                </a>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <i className='fa fa-light fa-users'>
                      <p> Capacité totale: {event.capacity}</p>
                    </i>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className='fa fa-light fa-user-plus'>
                      <p>
                        {' '}
                        Places disponible :{' '}
                        {event.numberOfPlacesLeft > 0
                          ? `${event.numberOfPlacesLeft}`
                          : 'Complet'}{' '}
                      </p>
                    </i>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <i className='fa fa-regular fa-bookmark'>
                          <p>Places à reserver:</p>
                        </i>
                      </Col>
                      <Col>
                        <select
                          className='form-select'
                          value={plc}
                          onChange={(e) => setPlc(e.target.value)}
                        >
                          {[...Array(event.numberOfPlacesLeft).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <i className='fa-solid fa-tag py-3' align='center'>
                    <p>Prix: {event.price}</p>
                  </i>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-success'
                    type='button'
                    disabled={
                      event.numberOfPlacesLeft === 0 ||
                      now.isAfter(dateLimit) ||
                      !user.userInfo || 
                      momentString === 'à venir'
                    }
                  >
                    Inscription
                  </Button>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr></hr>
        <SimpleReactLightbox>
          <SRLWrapper>
            <ImageList
              sx={{ width: 500, height: 450 }}
              variant='quilted'
              cols={4}
              rowHeight={121}
            >
              {event?.galerie?.map((item, index) => (
                <ImageListItem
                  key={item}
                  cols={
                    pattern[
                      index -
                        Math.floor(index / pattern.length) * pattern.length
                    ].cols
                  }
                  rows={
                    pattern[
                      index -
                        Math.floor(index / pattern.length) * pattern.length
                    ].rows
                  }
                  sx={{
                    opacity: '.7',
                    transition: 'opacity .3s linear',
                    cursor: 'pointer',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <img
                    {...srcset(
                      `${process.env.REACT_APP_BACKURL}/${item.slice(
                        8,
                        item.length
                      )}`,
                      200,
                      pattern[
                        index -
                          Math.floor(index / pattern.length) * pattern.length
                      ].rows,
                      pattern[
                        index -
                          Math.floor(index / pattern.length) * pattern.length
                      ].cols
                    )}
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </SRLWrapper>
        </SimpleReactLightbox>

        {event?.galerie &&
          event?.galerie?.map((image) => {
            return (
              <img
                src={`${process.env.REACT_APP_BACKURL}/${image.slice(
                  8,
                  image.length
                )}`}
                style={{ widht: '100px', height: '100px' }}
              />
            )
          })}

        {/* <img
          src={`${process.env.REACT_APP_BACKURL}/${event.galerie[0].slice(
            8,
            event.galerie[0].length
          )}`}
        /> */}

        <hr></hr>

        {/* COMMENT SECTION */}

        <Row>
          <Col md={12} lg={10} xl={8}>
            <Card>
              <Card.Title className='p-4'>Discussion</Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group className='py-2' controlId='desc'>
                      <Form.Label for='textarea'>
                        Poster votre comentaire
                      </Form.Label>
                      <Col md={9}>
                        <textarea
                          className='form-control'
                          id='textareacomment'
                          rows='3'
                          onChange={(e) => {
                            setContent(e.target.value)
                          }}
                        ></textarea>
                      </Col>
                    </Form.Group>
                  </Row>
                  <Button className='btn-success' type='submit'>
                    Commenter
                  </Button>
                </Form>

                <Row className='py-5'>
                  <Col>
                    {chat?.data?.map((msg, i) => (
                      <div className='d-flex flex-start'>
                        <Card.Img
                          className='rounded-circle shadow-1-strong me-3 profile-pic-post'
                          //src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp'
                          src={`${
                            process.env.REACT_APP_BACKURL
                          }/${msg?.sender?.userImage?.slice(
                            8,
                            msg?.sender?.userImage?.length
                          )}`}
                          alt='avatar'
                        />
                        <div className='flex-grow-1 flex-shrink-1'>
                          <div>
                            <div className='d-flex justify-content-between align-items-center'>
                              <p className='mb-1'>
                                {msg?.sender?.first_name}{' '}
                                {msg?.sender?.last_name}
                                <span className='small'>- 2 hours ago</span>
                              </p>

                              {msg?.sender?._id === user?.userInfo?.data?.id ||
                              user?.userInfo?.data?.role === 'admin' ? (
                                <div
                                  className='text-warning '
                                  aria-controls='example-collapse-text'
                                  aria-expanded={open}
                                  style={{ paddingLeft: '150px' }}
                                >
                                  {' '}
                                  <Button
                                    variant='danger'
                                    onClick={()=>handleDeleteComment(msg)}
                                  >
                                    <i
                                      class='fa fa-trash'
                                      aria-hidden='true'
                                    ></i>{' '}
                                    Supprimer
                                  </Button>
                                </div>
                              ) : null}

                              <div
                                className='text-info cursor-pointer'
                                aria-controls='example-collapse-text'
                                aria-expanded={open}
                              >
                                {' '}
                                <Button
                                  variant='info'
                                  onClick={() => clickHandler(i, msg._id)}
                                >
                                  <i class='fa fa-reply' aria-hidden='true'></i>{' '}
                                  Répondre
                                </Button>
                              </div>
                            </div>
                            <p className='small mb-0'>{msg.content}</p>
                          </div>
                          <Collapse
                            className={open === i ? '' : 'hidden'}
                            style={{ display: open === i ? 'block' : 'none' }}
                          >
                            <div id='example-collapse-text'>
                              <Form onSubmit={handleReplySubmit}>
                                <Row>
                                  <Form.Group className='py-2' controlId='desc'>
                                    <Col md={9}>
                                      <textarea
                                        className='form-control'
                                        id='textareareplycomment'
                                        rows='3'
                                        onChange={(e) => {
                                          setReply(e.target.value)
                                        }}
                                      ></textarea>
                                    </Col>
                                  </Form.Group>
                                </Row>
                                <Button type='submit' className='btn-success'>
                                  Reply
                                </Button>
                              </Form>
                            </div>
                          </Collapse>
                          {msg?.reps.map((rep, i) => (
                            <div className='d-flex flex-start mt-4'>
                              <a className='me-3' href='#'>
                                <Card.Img
                                  className='rounded-circle shadow-1-strong me-3 profile-pic-post'
                                  src={`${
                                    process.env.REACT_APP_BACKURL
                                  }/${rep?.sender?.userImage?.slice(
                                    8,
                                    rep?.sender?.userImage?.length
                                  )}`}
                                  alt='avatar'
                                  width='65'
                                  height='65'
                                />
                              </a>

                              <div className='flex-grow-1 flex-shrink-1'>
                                <div>
                                  <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-1'>
                                      {rep?.sender?.first_name}{' '}
                                      {rep?.sender?.last_name}
                                      <span className='small'>
                                        - 3 hours ago
                                      </span>
                                    </p>
                                  </div>
                                  <p className='small mb-0'>{rep.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/*<div className='d-flex flex-start mt-4'>
                          <a className='me-3' href='#'>
                            <Card.Img
                              className='rounded-circle shadow-1-strong me-3 profile-pic-post '
                              src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp'
                              alt='avatar'
                              width='65'
                              height='65'
                            />
                          </a>

                          <div className='flex-grow-1 flex-shrink-1'>
                            <div>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-1'>
                                  John Smith{' '}
                                  <span className='small'>- 4 hours ago</span>
                                </p>
                              </div>
                              <p className='small mb-0'>
                                the majority have suffered alteration in some
                                form, by injected humour, or randomised words.
                              </p>
                            </div>
                          </div>
                        </div>*/}
                        </div>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  )
}

export default EventScreen
