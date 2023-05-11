import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import march from '../images/march.png'

const Footer = () => {
  return (
    <footer className='bg-light'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <h4 className='fw-bold'>EVENTURA</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className='fw-bold'>Explorer</h5>
            <Link to='/aventures' style={{ color: 'black' }}>
              <p>Aventures</p>
            </Link>
            <Link to='/quizz' style={{ color: 'black' }}>
              <p>Quizz</p>
            </Link>
            <Link to='/nous' style={{ color: 'black' }}>
              <p>Qui somme-nous ?</p>
            </Link>
          </Col>
          <Col>
            <h5 className='fw-bold'>Contact</h5>
            <Link to='/contactez-nous' style={{ color: 'black' }}>
              <p>Contactez-nous</p>
            </Link>
          </Col>
          <Col>
            <div align='center'>
              <img src={march} style={{ height: '200px' }} />
            </div>
          </Col>
        </Row>
        <Row>
          <h5 className='fw-bold'>Suivez Nous </h5>
          <div style={{ display: 'flex' }}>
            <i className='fa fa-brands fa-instagram px-5'></i>{' '}
            <i className='fa fa-brands fa-facebook'></i>
          </div>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Mitux developers team
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
