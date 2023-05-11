import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Col, Row } from 'react-bootstrap'
import Pagination from './Pagination'
import EventsList from './EventsList'
import CreateEventModal from './CreateEventModal'
import Loader from '../components/Loader'
import AdminCategoryModal from './AdminCategoryModal'
import { toast } from 'react-toastify'
import authHeader from '../api/auth-header'

const AdminEventList = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)
  const [modalShow, setModalShow] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  
  const config = { headers: authHeader() }

  const fetchEvents = async () => {
    await axios.get(`${process.env.REACT_APP_BACKURL}/event`,config).then((res) => {
      setEvents(res.data)
    }).catch((error) => {
      if (error.response.data.message === 'jwt expired') {
        toast.error('session expired, veuillez se reconnecter', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
      }})
  }
  const refresh = () => {
    setLoading(!loading)
  }
  useEffect(() => {
    fetchEvents()
  }, [loading])
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const message = () => {
    console.log('create me')
  }

  return (
    <>
      <Container className='py-3' fluid='md'>
        <Row>
          <div className='card-wrapper'>
            <Row>
              <Container className='py-3'>
                <div className='card-wrapper-box'>
                  <Row>
                    <Col>
                      <div
                        className=' d-flex justify-content-left py-3 px-5'
                        style={{ color: 'white' }}
                      >
                        <i
                          className='fa fa-thin fa-calendar fa-6x'
                          align='center'
                        >
                          <h6>Nombre totale des Aventures</h6>
                        </i>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className=' d-flex justify-content-center py-3'
                        style={{ color: 'white' }}
                      >
                        <i
                          className='fa fa-thin fa-address-card fa-6x'
                          align='center'
                        >
                          <h6>Nombre totale des inscrits</h6>
                        </i>
                      </div>
                    </Col>

                    <Col>
                      <div
                        className='d-flex justify-content-center p-2 py-3 cursor-pointer '
                        style={{ color: 'white' }}
                        onClick={() => setCategoryShow(true)}
                      >
                        <i
                          className='fa fa-solid fa-list fa-6x '
                          align='center'
                        >
                          <h6>Consulter Catégories</h6>
                        </i>
                      </div>
                    </Col>

                    <Col>
                      <div
                        className='d-flex justify-content-center p-2 py-3 cursor-pointer '
                        style={{ color: 'white' }}
                        onClick={() => setModalShow(true)}
                      >
                        <i
                          className='fa fa-solid fa-plus fa-6x '
                          align='center'
                        >
                          <h6>Créer un événement</h6>
                        </i>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </Row>
            <CreateEventModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <AdminCategoryModal
              show={categoryShow}
              onHide={() => setCategoryShow(false)}
            />
            <hr></hr>

            {events.length === 0 ? (
              // <Message>there is no events</Message>
              <Loader />
            ) : (
              <Row>
                <h3>Liste des aventures</h3>
                <Container className='py-3'>
                  <EventsList events={currentEvents} refresh={refresh} />

                  <div className='d-flex justify-content-center'>
                    <Pagination
                      usersPerPage={eventsPerPage}
                      totalUsers={events.length}
                      paginate={paginate}
                    />
                  </div>
                </Container>
              </Row>
            )}
          </div>
        </Row>
      </Container>
    </>
  )
}

export default AdminEventList
