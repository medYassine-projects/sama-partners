import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Col, Row } from 'react-bootstrap'
import Pagination from './Pagination'
import Loader from '../components/Loader'
import CreateEventModal from './CreateEventModal'
import QuizsList from './QuizsList'
import CreateQuizModal from './CreateQuizModal'
import authHeader from '../api/auth-header'
import { toast } from 'react-toastify'

const AdminQuizList = () => {
  const [quizs, setQuizs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [quizsPerPage] = useState(6)
  const [modalShow, setModalShow] = useState(false)
  const config = {headers: authHeader()}

  const fetchQuizs = async () => {
    await axios.get(`${process.env.REACT_APP_BACKURL}/quiz/`,config).then((res) => {
      setQuizs(res.data)
    }).catch((error) => {
      if (error.response.data.message === 'jwt expired') {
        toast.error('session expired, veuillez se reconnecter', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
      }})
  }

  useEffect(() => {
    setLoading(true)
    fetchQuizs()
    setLoading(false)

  }, [])

  const indexOfLastQuiz = currentPage * quizsPerPage
  const indexOfFirstQuiz = indexOfLastQuiz - quizsPerPage
  const currentQuizs = quizs.slice(indexOfFirstQuiz, indexOfLastQuiz)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
                          className='fa fa-solid fa-question fa-6x'
                          align='center'
                        >
                          <h6>Nombre totale des Quizs</h6>
                        </i>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className=' d-flex justify-content-center py-3'
                        style={{ color: 'white' }}
                      >
                        <i
                          className='fa fa-solid fa-reply fa-6x'
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
                        onClick={() => setModalShow(true)}
                      >
                        <i
                          className='fa fa-solid fa-plus fa-6x '
                          align='center'
                        >
                          <h6>Créer un quiz</h6>
                        </i>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </Row>
            <CreateQuizModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <hr></hr>

            {quizs.length === 0 ? (
              // <Message>there is no events</Message>
              <Loader />
            ) : (
              <Row>
                <h3>Liste des aventures</h3>
                <Container className='py-3'>
                  <QuizsList quizs={currentQuizs} />

                  <div className='d-flex justify-content-center'>
                    <Pagination
                      usersPerPage={quizsPerPage}
                      totalUsers={quizs.length}
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

export default AdminQuizList
