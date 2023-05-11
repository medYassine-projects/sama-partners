import React from 'react'
import { useHistory } from 'react-router'
import { Button, Col, Row, Container, Card } from 'react-bootstrap'
import home from '../images/homeCamping.jpg'
import '../sass.scss'

const HomeHeader = () => {
  const history = useHistory()

  const routeChange = () => {
    let path = `/aventures`

    history.push(path)
  }

  return (
    <Container className='py-5'>
      <Card className='shadow p-3 mb-5 bg-white rounded'>
        <Row>
          <Col md={5}>
            <h2 className='py-5 mx-5'>
              Vivez vos prochaines aventures en un seul clic !
            </h2>
            <Button className='mb-5 mx-5 btn-info' onClick={routeChange}>
              Explorez nos aventures
            </Button>
          </Col>
          <Col md={7}>
            <img
              src={home}
              style={{ height: '350px' }}
              className='ms-auto px-auto'
            />
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default HomeHeader
