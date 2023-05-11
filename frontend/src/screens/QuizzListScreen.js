import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizzList } from '../actions/quizzAction'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Quizz from '../components/Quizz'

const QuizzListScreen = ({ setCurrentId }) => {
  const dispatch = useDispatch()

  const quizzList = useSelector((state) => state.quizzList.quizz)
  

  useEffect(() => {
    dispatch(getQuizzList())
  }, [])

  return (
    <Container>
      <Row>
        {quizzList.map((quizz, i) => (
          <Col sm={3} md={4}>
            <Quizz quizz={quizz} setCurrentId={quizz.id} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default QuizzListScreen
