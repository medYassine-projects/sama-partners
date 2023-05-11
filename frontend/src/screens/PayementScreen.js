import React, { useState } from 'react'
import { Container, Form, Button, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {payAction} from '../actions/cartActions'

const PayementScreen = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const dispatch=useDispatch()
  const pay = ()=>{
      const amount= 50000
      dispatch(payAction(500000))
  }
  return (
    <div>
      <Container className='py-3'>
        <h1>Payement</h1>
        <Form className='py-3'>
          <Form.Group>
            <Form.Label>Selectionner une méthode</Form.Label>
          </Form.Group>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal ou Carte Credit'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
            ></Form.Check>
          </Col>
          <Form.Group className='py-3' controlId='address'>
            <Form.Label>Adresse</Form.Label>
            <Col md={5}>
              <Form.Control
                type='text'
                placeholder='Entrer votre adresse'
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>Ville</Form.Label>
            <Col md={5}>
              <Form.Control
                type='text'
                placeholder='Entrer votre ville'
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group className='py-2' controlId='postalCode'>
            <Form.Label>Code postal</Form.Label>
            <Col md={5}>
              <Form.Control
                type='text'
                placeholder='Code Postal'
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group className='py-2' controlId='country'>
            <Form.Label>Pays</Form.Label>
            <Col md={5}>
              <Form.Control
                type='text'
                placeholder='Pays'
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Button type='submit' variant='success' onClick={pay()}>
            Finaliser
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default PayementScreen
