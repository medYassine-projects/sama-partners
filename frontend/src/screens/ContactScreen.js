import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import contact from '../images/contact.png'
import { contactUs } from '../api/index'

const ContactScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')
  const [doc, setDoc] = useState('')

  const docHandler = (e) => {
    setDoc(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('first_name', firstName)
    fd.append('last_name', lastName)
    fd.append('email', email)
    fd.append('type', type)
    fd.append('message', message)
    if (type === "Demande d'un compte agent") {
      console.log(doc)
      fd.append('document', doc)
    }

    //const fd = {first_name:firstName,last_name:lastName,email:email,type:type,message:message}
    contactUs(fd)
  }

  return (
    <>
      <div class='float-container'>
        <Row>
          <div className='float-child'>
            <div>
              <Container className='py-4 px-5'>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      {' '}
                      <Form.Group className='py-2' controlId='firstName'>
                        <Form.Label>Prénom</Form.Label>
                        <Col md={7}>
                          <Form.Control
                            type='text'
                            placeholder='Prénom'
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className='py-2' controlId='lastName'>
                        <Form.Label>Nom</Form.Label>
                        <Col md={7}>
                          <Form.Control
                            type='text'
                            placeholder='Nom'
                            required
                            onChange={(e) => setLastName(e.target.value)}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Form.Group className='py-2' controlId='email'>
                      <Form.Label>Adresse mail</Form.Label>
                      <Col md={9}>
                        <Form.Control
                          type='text'
                          placeholder='Adresse mail'
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group className='py-2' controlId='topic'>
                      <Form.Label>Sujet</Form.Label>
                      <Col md={9}>
                        <select
                          className='form-select'
                          id='selectTopic'
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value='Demande d aide'>Demande d'aide</option>
                          <option value="Demande d'un compte agent">
                            Demande d'un compte agent
                          </option>
                          <option value="Demande d'un compte de partenaire">
                            Demande d'un compte de partenaire
                          </option>
                        </select>
                      </Col>
                    </Form.Group>

                    <Form.Group className='py-2' controlId='desc'>
                      <Form.Label for='textarea'>Description</Form.Label>
                      <Col md={9}>
                        <textarea
                          className='form-control'
                          id='textarea'
                          rows='3'
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </Col>
                    </Form.Group>

                    {type === "Demande d'un compte agent" ? (
                      <Form.Group className='py-2' controlId='file'>
                        <Form.Label for='formFile'>Documents</Form.Label>
                        <Col md={9}>
                          <input
                            className='form-control'
                            type='file'
                            id='formFile'
                            onChange={docHandler}
                          />
                        </Col>
                      </Form.Group>
                    ) : (
                      <></>
                    )}
                  </Row>
                  <div align='center' className='py-2'>
                    <Button className='btn-info px-5' type='submit'>
                      Envoyer
                    </Button>
                  </div>
                </form>
              </Container>
            </div>
          </div>

          <div className='float-child bg-light'>
            <Container className='py-5'>
              <h1 className='fw-bold'>Comment on peut vous aidez ?</h1>
              <h5 className=''>
                Veuillez sélectionner un sujet lié à votre demande. Si vous ne
                trouvez pas ce dont vous avez besoin, remplissez notre
                formulaire de contact
              </h5>
              <hr />
              <h4 className='fw-bold py-2'>Compte d'agent</h4>
              <h5>Contacter-nous pour avoir un compte d'agent</h5>
              <hr />
              <h4 className='fw-bold py-2'>Demande d'aide</h4>
              <h5>Demander de l'aide à notre service client</h5>
              <hr />
              <Row>
                <Col>
                  {' '}
                  <h4 className='fw-bold py-2'>Partenariat</h4>
                  <h5>Devenir un partenaire</h5>
                </Col>
                <Col>
                  <img src={contact} className='img-resize float-end' />
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </div>
    </>
  )
}

export default ContactScreen
