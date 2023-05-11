import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { Card, Container, Row, Button, Col, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const ResetPasswordRequestScreen = () => {
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_BACKURL}/user/forgetPassword`, { email: email }).then((res)=>{if (res.data.status ==='success'){
      toast.success('un mail de changement de mot de passe a été envoyer',{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
    else {
      toast.error('something wrong happened ',{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
  })
    setDisabled(true)
    const timeout = setTimeout(() => {
      setDisabled(false)
    }, 5000)
    console.log('start 5s')
    return () => clearTimeout(timeout)
  }
  return (
    <div>
      <Container className='mx-auto py-5 mt-5'>
        <Row>
          <div align='center'>
            <Card className='cardWidth'>
              <Card.Title className='mt-3'>
                <h4 className='fw-bold'>Réinisialisé mot de passe !</h4>
              </Card.Title>
              <Card.Text>
                Tapé vote adresse mail et nous vous envoyer un lien pour
                réinsialisé votre mot de passe
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='py-3' controlId='mailAdress'>
                  <Form.Label className='fw-bold'>Adresse mail</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      //name="email"
                      type='text'
                      placeholder='Entrer votre adresse mail'
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      required
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <div align='center'>
                  <Button
                    type='submit'
                    disabled={disabled}
                    className='btn-success mb-3'
                  >
                    Envoyer !
                  </Button>
                </div>
              </Form>
              {/*<LinkContainer to='/reinisialisation-mot-de-passe'>
                <a className='text-info'>
                  Rediriger pour changer le mot de passe
                  <i className='mx-2 fa fa-solid fa-angles-right'></i>
                </a>
                    </LinkContainer>*/}
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default ResetPasswordRequestScreen
