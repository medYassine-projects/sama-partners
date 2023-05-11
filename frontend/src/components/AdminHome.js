import React, { useEffect, useState } from 'react'
import {
  Container,
  Col,
  Row,
  Card,
} from 'react-bootstrap'
import axios from 'axios'
import AdminReservationList from './AdminReservationList'
import authHeader from '../api/auth-header'
import { toast } from 'react-toastify'
import { Sales } from './Sales';


const AdminHome = () => {
  const [categories, setCategories] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState()
  const [wait, setWait] = useState(false)
  const [waitEvents, setWaitEvents] = useState(false)
  const [numberOfEventsComing, setNumberOfEventsComing] = useState()
  const [numberTotale, setNumberTotale] = useState()
  const [waitTotale, setWaitTotale] = useState(false)
  const config = {headers: authHeader()}

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`,config
    )
    setCategories(data?.data)
  }

  const fetchUsersNumber = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKURL}/user/getTotaleUsersNumber`,config)
      .then((res) => {
        setNumberOfUsers(res.data.data)
        setWait(true)
      })
  }

  const fetchComingEventsNumber = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKURL}/event/numberOfComingEvents/get`,config)
      .then((res) => {
        setNumberOfEventsComing(res.data.data)
        setWaitEvents(true)
      })
  }
  const fetchAllEvents = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKURL}/event/getAllEventsNumber/get`,config)
      .then((res) => {
        setNumberTotale(res.data.data)
        setWaitTotale(true)
      }).catch((error) => {
        if (error.response.data.message === 'jwt expired') {
          toast.error('session expired, veuillez se reconnecter', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        }})
  }

  useEffect(() => {
    fetchCategories()
    fetchUsersNumber()
    fetchComingEventsNumber()
    fetchAllEvents()
  }, [])

  return (
    <div>
      <Container className='py-3' fluid='md'>
        <div className='card-wrapper' style={{'overflow-y': 'scroll'}}>
          <Container className='py-3'>
            <Row >
              <Col>
                {wait === false ? (
                  <>wait</>
                ) : (
                  <Card className='text-white bg-info'>
                    <Card.Body>
                      <Row>
                        <Col md={10}>
                          <h5>Utilisateurs totale</h5>
                        </Col>

                        <Col md={2}>
                          <i className='fa fa-solid fa-users fa-xl'></i>
                        </Col>
                      </Row>
                      <Row className='text-center'>
                        <Col>
                          <h3>{numberOfUsers}</h3>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Col>

              <Col>
                {waitEvents === false ? (
                  <p> patientez un moment</p>
                ) : (
                  <Card className='text-white bg-success'>
                    <Card.Body>
                      <Row>
                        <Col md={10}>
                          <h5>Aventures à venir</h5>
                        </Col>

                        <Col md={2}>
                          <i className='fa fa-duotone fa-calendar fa-xl'></i>
                        </Col>
                      </Row>
                      <Row className='text-center'>
                        <Col>
                          <h3>{numberOfEventsComing}</h3>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Col>

              <Col>
                {waitTotale === false ? (
                  <p>wait a sec</p>
                ) : (
                  <Card className='text-white bg-warning'>
                    <Card.Body>
                      <Row>
                        <Col md={10}>
                          <h5>Aventures totale</h5>
                        </Col>

                        <Col md={2}>
                          <i className='fa fa-regular fa-bolt fa-xl'></i>
                        </Col>
                      </Row>
                      <Row className='text-center'>
                        <Col>
                          <h3>{numberTotale}</h3>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
            
            <Sales />
          
            <Row className='py-5'>
              <Col md={8}>
                <Card>
                  <Card.Header>Liste des réservations</Card.Header>
                  <Card.Body>
                    <AdminReservationList />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='text-white bg-secondary'>
                  <Card.Header>Catégories</Card.Header>
                  <Card.Body>
                    {categories &&
                      categories?.map((cat, i) => {
                        return <h5 key={i}>{cat?.label}</h5>
                      })}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default AdminHome
