import React, { useState } from 'react'
import axios from 'axios'
import { Card, Container, Row, Button, Col, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { useParams, useHistory} from 'react-router-dom'
import { useEffect } from 'react'
import styles from '../components/EmailVerifyStyles.module.css'
import fail from '../images/notFound.PNG'
import { toast } from 'react-toastify'

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')
  const [message, setMessage] = useState(null)

  const param = useParams()
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(password, token)
    if (password && password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas')
    } else {
      axios.post(`${process.env.REACT_APP_BACKURL}/user/resetPassword/${token}`, {
        password: password,
      }).then((res)=>{
        console.log(res)
        if (res.data.status==='success'){
        toast.success('le mot de passe a été changer ',{
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        }).then(history.push('/'))}
        else {
          toast.error('something wrong happened ',{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        }
      })
    }
  }

  

  useEffect(()=>{
    if(param.token) {
      setToken(param.token)
    }
  },[])

  return (
    
      <>
        {param.token? 
      <Container className='mx-auto py-1 mt-1'>
        <Row>
          <div align='center'>
            <Card className='cardWidth'>
              <Card.Title className='mt-3'>
                <h4 className='fw-bold'>Réinisialisé mot de passe !</h4>
              </Card.Title>
              {message && <Message variant='danger'>{message}</Message>}
              <Card.Text>
                Un mot de passe fort comprend des chiffres, des lettres et des
                signes de ponctuation
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='py-2' controlId='token'>
                {param.token ? <></> :<><Form.Label className='fw-bold'>
                    Saisir le code envoyé via mail
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type='text'
                      required
                      onChange={(e) => {
                        setToken(e.target.value)
                      }}
                    ></Form.Control>
                  </Col></>}
                </Form.Group>
                <Form.Group className='py-3' controlId='newPassword'>
                  <Form.Label className='fw-bold'>
                    Entrez un nouveau mot de passe
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type='text'
                      required
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group className='py-3' controlId='newPasswordCheck'>
                  <Form.Label className='fw-bold'>
                    Confirmer le nouveau mot de passe
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type='text'
                      required
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                      }}
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <div align='center'>
                  <Button type='submit' className='btn-success mb-3'>
                    Réinisialisé !
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </Row>
      </Container>
    
    :  (<>
      <div >
        <img
          src={fail}
          alt='404'
          style={{ height: '350px', width: '400px' }}
          
        />
        <h1>404 Not Found</h1>
      </div>
    </>)}
    </>
    
  )
}

export default ResetPasswordScreen
