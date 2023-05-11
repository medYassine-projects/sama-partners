import React, { useState } from 'react'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import  {useDispatch, useSelector} from 'react-redux'
import  {updateUserProfile} from '../actions/userActions'
import { toast } from 'react-toastify'
const AdminUserDetailsModal = (props) => {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const userUpdate = useSelector((state)=>state.userUpdateProfile)
  const {error,success,loading} = userUpdate

  const [message, setMessage] = useState(null)
  const [image, setImage] = useState('')
  const [photo, setPhoto] = useState(
    `${process.env.REACT_APP_BACKURL}/${props.user?.userImage?.slice(
      8,
      props.user?.userImage?.length
    )}`
  )
  const dispatch=useDispatch()
  const imageHandler = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password && password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas')
    } else {
      const formData = new FormData()
      if (image) {
        formData.append('userImage', image)
      }
      if (firstName) {
        formData.append('first_name', firstName)
      }
      if (lastName) {
        formData.append('last_name', lastName)
        console.log('hello')
      }
      formData.append('email', props.user.email)
      if (password) {
        formData.append('password', password)
      }

      dispatch(updateUserProfile(formData, props.user._id))
      if (success) {
        toast.success('utilisateur modifier avec success', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
      })
      props.onHide()
      } else if (error) {
        toast.error('il y a une erreur', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
      })
      }
      console.log(userUpdate)
    }
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          User details
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
        {message && <Message variant='danger'>{message}</Message>}
          <div className='d-flex justify-content-center'>
            <div className='profile-pic-div'>
              <img className='' src={photo} id='photo' />
              <input type='file' id='file' onChange={imageHandler} />
              <label htmlFor='file' id='uploadBtn'>
                Choisir une photo
              </label>
            </div>
          </div>
          <Row className='d-flex justify-content-center'>
            <div className='justify-content-center col-md-8 offset-md-3'>
              <Form.Group className='py-3' controlId='firstName'>
                <Form.Label>Prénom</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='text'
                    placeholder={props.user.first_name}
                    //value={firstName}
                    //required
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group controlId='lastName'>
                <Form.Label>Nom de famille</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='text'
                    placeholder={props.user.last_name}
                    //value={lastName}
                    onChange={(e) => {
                      
                      setLastName(e.target.value)
                    }}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group controlId='address'>
                <Form.Label>Adresse mail</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='text'
                    value={props.user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Enter votre nouveau mot de passe</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='password'
                    placeholder='Entrer votre nouveau mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirmer votre mot de passe</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='password'
                    placeholder='Confirmer votre mot de passe'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Col>
              </Form.Group>
            </div>
          </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' variant='success'>Update</Button>
        <Button onClick={props.onHide} variant='light'>
          Close
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AdminUserDetailsModal
