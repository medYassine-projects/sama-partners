import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import MessageForm from '../components/MessageForm'

const ChatScreen = () => {
  return (
    <Container className='py-3'>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  )
}

export default ChatScreen
