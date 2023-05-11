import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Row, Col, Button, Card, Container, Modal } from 'react-bootstrap'
import axios from 'axios'

const QuizzScreen = ({ match }) => {
  const history = useHistory()

  const routeChange = () => {
    let path = `/`

    history.push(path)
  }

  const id = match.params.id.toString()

  const [quizz, setQuizz] = useState([])
  const fetchQuizz = async () => {
    //axios.defaults.baseURL ='http://127.0.01:3030'

    const { data } = await axios.get(`${process.env.REACT_APP_BACKURL}/quiz/${id}`)
    setQuizz(data)
  }

  useEffect(async () => {
    await fetchQuizz()
  }, [])


  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerOptionClick = (optionScore) => {
    if (optionScore) {
       setScore(score + optionScore)
    }
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizz.questions?.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
      const user = JSON.parse(localStorage.getItem("userInfo"))
      axios.put(`${process.env.REACT_APP_BACKURL}/quiz/${match.params.id}/${user.data.id}/${score+optionScore}`) 
    }
  }

  // const goNext = () => {
  //   setCurrentQuestion(currentQuestion + 1)
  // }

  // const goBack = () => {
  //   if (currentQuestion - 1 < questions.length) {
  //     setCurrentQuestion(currentQuestion - 1)
  //   }
  // }

  // const nextQuestion = currentQuestion + 1
  // if (nextQuestion < questions.length) {
  //   setCurrentQuestion(nextQuestion)
  // }

  // const previousQuestion = currentQuestion - 1
  // if (previousQuestion > questions.length) {
  //   setCurrentQuestion(previousQuestion)
  // }
  
  return (
    <>
      {showScore ? (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Score de votre Quizz</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <div align='center'>
                <h1 className='text-success'>Ton score est : {score}</h1>
              </div>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='info' type='button' onClick={routeChange}>
              Acceuil
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <Container className='mt-5 py-5'>
          <h1 className='text-center text-success'>{quizz.name}</h1>
          <p align='center'>Prends 1 minute pour répondre à 5 questions.</p>
          <div>
            <div>
              <h4 className='text-primary text-center'>
                Question {currentQuestion + 1}/{quizz?.questions?.length}
              </h4>
            </div>
            <h5 className='text-dark text-center py-2'>
              {quizz?.questions?.length
                ? quizz?.questions[currentQuestion]?.question
                : 'does not exist'}
            </h5>
            <Row className='py-4'>
              <Row>
                {quizz?.questions?.length &&
                quizz?.questions[currentQuestion]?.answers?.length
                  ? quizz?.questions[currentQuestion]?.answers.map(
                      (answers, i) => {
                        return (
                          <Col md={3} ml={6} className='m-auto'>
                            <div>
                              <Button
                                type='button'
                                name='answers'
                                variant='light'
                                value={answers.option}
                                onClick={() =>
                                  handleAnswerOptionClick(answers?.optionScore)
                                }
                              >
                                {answers?.option}
                              </Button>
                            </div>
                          </Col>
                        )
                      }
                    )
                  : 'loading'}
              </Row>
              {/* <Row className='py-5'>
              <Col>
                <Button
                  type='button'
                  variant='info'
                  className='arrow-right'
                  onClick={goBack}
                  disabled={currentQuestion === 0}
                >
                  <i className='fa fa-regular fa-angles-left'></i>
                </Button>
              </Col>
              <Col>
                <Button
                  type='button'
                  variant='info'
                  onClick={goNext}
                  disabled={currentQuestion === questions.length - 1}
                >
                  <i className='fa fa-regular fa-angles-right'></i>
                </Button>
              </Col>
            </Row> */}
            </Row>
          </div>
        </Container>
      )}
    </>
  )
}

export default QuizzScreen
