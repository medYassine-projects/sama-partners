import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import slide3 from '../images/imageslide1.jpg'
import './settings.css'
import { updateUser } from '../api/index'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const SettingsScreen = () => {
  const history = useHistory()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState(null)
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success,loading, error } = userUpdateProfile
  const [photo, setPhoto] = useState(
    `${process.env.REACT_APP_BACKURL}/${user?.data?.userImage?.slice(
      8,
      user?.data?.userImage?.length
    )}`
  )

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      if (!user.first_name) {
        dispatch(getUserDetails(userInfo.data.id))
      } else {
        /*setPhoto(user?.data?.userImage)
        setFirstName(user?.data?.first_name)
        setLastName(user?.data?.last_name)
        setEmail(user?.data?.email)*/
      }
    }
  }, [dispatch, history, userInfo])

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
      formData.append('email', userInfo?.data?.email)
      if (password) {
        formData.append('password', password)
      }

      dispatch(updateUserProfile(formData, userLogin.userInfo.data.id))
    }
  }

  /* const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas')
    } else {
      dispatch(
        updateUserProfile({
          id: user?.data?._id,
          firstName,
          lastName,
          password,
          photo,
        })
      )
    }
    console.log(user?.data?._id)
  }*/

  return (
    <div>
      <Container className='justify-content-md-center py-3'>
        <h1 className='justify-content-md-center' align='center'>
          Paramétres de profile
        </h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error.slice(104,131)}</Message>}
        {success && <Message variant='success'>Proifle Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <div className='profile-pic-div'>
                <img className='' src={photo} id='photo' />
                <input type='file' id='file' onChange={imageHandler} />
                <label htmlFor='file' id='uploadBtn'>
                  Choisir une photo
                </label>
              </div>
            </Col>
            <Col md={6}>
              <Form.Group className='py-3' controlId='firstName'>
                <Form.Label>Prénom</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='text'
                    placeholder={user?.data?.first_name}
                    //value={firstName}
                    //required
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group className='py-3' controlId='lastName'>
                <Form.Label>Nom de famille</Form.Label>
                <Col md={7}>
                  <Form.Control
                    type='text'
                    placeholder={user?.data?.last_name}
                    //value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group className='py-3' controlId='address'>
                <Form.Label>Adresse mail</Form.Label>
                <Col md={7}>
                  <Form.Control
                    plaintext
                    value={userInfo?.data?.email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group className='py-3' controlId='password'>
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

              <Form.Group className='py-3' controlId='confirmPassword'>
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

              <Button type='submit' className='px-5 rounded-pill btn-info'>
                Sauvgarder
              </Button>
              <Button className='mx-5 px-5 rounded-pill btn-danger'>
                Annuler
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default SettingsScreen
