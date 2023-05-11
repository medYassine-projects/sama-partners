import React, { useState } from 'react'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {createUser} from '../actions/userActions'
import { useDispatch ,useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

const CreateUserModal = (props) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('')
  const [role, setRole] =useState('')
  const [message, setMessage] = useState(null)
  const [photo, setPhoto] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading_register, error_register, userInfo_register } = userRegister

  const handleRole = (e) => {
    setRole( e.target.value )
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (registerPassword !== confirmRegisterPassword) {
      setMessage('Les mots de passe ne correspondent pas')
    } else {
        console.log(firstName,lastName,registerEmail,registerPassword);
        console.log(photo)
        const fd = new FormData()
        fd.append('first_name',firstName)
        fd.append('last_name',lastName)
        fd.append('email',registerEmail)
        fd.append('password',registerPassword)
        fd.append('role',role)
        fd.append('userImage',photo)
        dispatch( createUser(fd)
      )
    }
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Form onSubmit={handleRegister}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Créé un utilisateur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <Message variant='danger'>{message}</Message>}
          <Row>
            <Col md={6}>
              <div className='form-group'>
                <label for='exampleInputFirstName' className='form-label'>
                  Nom
                </label>
                <input
                  name='nom'
                  type='text'
                  className='form-control'
                  id='exampleInputFirstName'
                  placeholder='Nom'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className='form-group'>
                <label for='exampleInputFirstName' className='form-label'>
                  Prénom
                </label>
                <input
                  name='prenom'
                  type='text'
                  className='form-control'
                  id='exampleInputFirstName'
                  placeholder='Prénom'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <div className='form-group'>
              <label for='exampleInputEmail1' className='form-label mt-2'>
                Adresse email
              </label>
              <input
                name='email'
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Entrer votre adresse email'
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
          </Row>
          <Row>
            <Col md={6}>
              <div className='form-group'>
                <label for='registerPassword' className='form-label mt-2'>
                  Mot de passe
                </label>
                <input
                  name='registerPassword'
                  type='password'
                  className='form-control'
                  id='registerPassword'
                  placeholder='Mot de passe'
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className='form-group'>
                <label
                  for='confirmRegisterPassword'
                  className='form-label mt-2'
                >
                  Confirmer le mot de passe
                </label>
                <input
                  name='confirmRegisterPassword'
                  type='password'
                  className='form-control'
                  id='confirmRegisterPassword'
                  placeholder='Confirmer le mot de passe'
                  onChange={(e) => setConfirmRegisterPassword(e.target.value)}
                />
              </div>
            </Col>
            <Row className='py-2'>
              <Col md={6}>
                <Form.Group controlId='formFileSm' className='mb-3 mt-1'>
                  <Form.Label>Ajouter une photo de profile</Form.Label>
                  <Form.Control
                    type='file'
                    accept='image/*'
                    size='sm'
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Rôle</Form.Label>
                  <select className='form-select' onChange={handleRole} id='exampleSelect1'>
                    <option value='' disabled selected hidden>
                      Sélectionner un rôle
                    </option>
                    <option name='role' value='basic'>basic</option>
                    <option name='role'value='supervisor'>supervisor</option>
                    <option>admin</option>
                  </select>
                </Form.Group>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant='secondary'>
            Close
          </Button>
          <Button variant='info' type='submit'>
            Créé
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
