import React, { Component, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Modal, Button, Col, Row, Container, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import image from '../images/hicking.jpg'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../actions/userActions'

const Signin = (props) => {
  const classes = useStyles()
  const [show, setShow] = useState(true)
  const [isSignIn, setIsSignIn] = useState(true)

  const toggleIsSignIn = () => {
    setIsSignIn(!isSignIn)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [photo, setPhoto] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  //user Redux

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const userRegister = useSelector((state) => state.userRegister)
  const { loading_register, error_register, userInfo_register } = userRegister
  const [regSucc,setRegSucc]= useState()
  

  const googleFailure = (error) => {
    console.error(error)
    console.log('google sign in error')
  }
  const googleSuccess = async (res) => {
    console.log('secc')
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
    } catch (error) {
      console.log(error)
    }
    console.log(res)
  }

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])
  //const [formData, setFormData] = useState(initialState)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
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
        fd.append('role','basic')
        fd.append('userImage',photo)
        const d = dispatch( register(fd))
        setRegSucc(true)
    }
    console.log('register')
  }
  return (
    <div>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Row>
          <Col>
            <Container>
              <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                  Se connecter / S'inscrire
                </Modal.Title>
              </Modal.Header>
              {isSignIn ? (
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    {loading && <Loader />}
                    {error && <Message variant='danger'>{error}</Message>}
                    <div className='form-group'>
                      <label
                        for='exampleInputEmail1'
                        className='form-label mt-4'
                      >
                        Adresse email
                      </label>
                      <input
                        name='email'
                        type='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        placeholder='Entrer adresse email'
                        //value={userEmail}
                        //onChange={(e) => setUserEmail(e.target.value)}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label
                        for='exampleInputPassword1'
                        className='form-label mt-4'
                      >
                        Mot de passe
                      </label>
                      <input
                        name='password'
                        type='password'
                        className='form-control'
                        id='exampleInputPassword1'
                        placeholder='Mot de passe'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <small id='emailHelp' className='form-text text-muted'>
                        Mot de passe oublié?{' '}
                        <Link to='/reinisialise-mot-de-passe'>
                          <a
                            className='text-primary'
                            onClick={() => props.onHide()}
                          >
                            Réinisialise le
                          </a>
                        </Link>
                      </small>
                    </div>
                    <br />
                    {/*<GoogleLogin
                      clientId='601991377665-itdhrs666m88p2jccjsbpsdcdt36f36f.apps.googleusercontent.com'
                      render={(renderProps) => (
                        <button
                          className={classes.googleButton}
                          onClick={renderProps.onClick}
                          //disabled ={renderProps.disabled}
                          variant='contained'
                        >
                          GOOGLE Sign in
                        </button>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleFailure}
                      cookiePolicy='single_host_origin'
                      />*/}
                    <Row align='center'>
                      <Button type='submit'>Se connecter</Button>
                    </Row>
                  </Form>
                  <Row align='center'>
                    <div className='d-flex m-r-6'>
                      Pas encore inscrit ?{' '}
                      <div
                        onClick={toggleIsSignIn}
                        className='text-success cursor-pointer text-underline'
                      >
                        Inscris-toi
                      </div>
                    </div>
                  </Row>
                </Modal.Body>
              ) : (
                /************ 2eme partie inscription ***************/
                <Modal.Body>
                  <Form onSubmit={handleRegister}>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error_register && (
                      <Message variant='danger'>{error_register}</Message>
                    )}
                    {loading_register && <Loader />}
                    {regSucc && !loading_register && !error_register && <Message variant='success'>un mail de verification a été envoyer</Message>}
                    <Row>
                      <Col>
                        <div className='form-group'>
                          <label
                            for='exampleInputFirstName'
                            className='form-label'
                          >
                            Nom
                          </label>
                          <input
                            name='nom'
                            type='text'
                            className='form-control'
                            id='exampleInputFirstName'
                            placeholder='Nom'
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className='form-group'>
                          <label
                            for='exampleInputFirstName'
                            className='form-label'
                          >
                            Prénom
                          </label>
                          <input
                            name='prenom'
                            type='text'
                            className='form-control'
                            id='exampleInputFirstName'
                            placeholder='Prénom'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className='form-group'>
                      <label
                        for='exampleInputEmail1'
                        className='form-label mt-2'
                      >
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
                        required
                      />
                    </div>
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
                        required
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>

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
                        required
                        onChange={(e) =>
                          setConfirmRegisterPassword(e.target.value)
                        }
                      />
                    </div>
                    <div>
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
                    </div>
                    <br />
                    <Row align='center'>
                      <Button type='submit' className='btn-success'>
                        Inscription
                      </Button>
                    </Row>
                  </Form>
                  <div className='d-flex m-r-6'>
                    Vous avez déja un compte?{' '}
                    <div
                      onClick={toggleIsSignIn}
                      className='text-success cursor-pointer text-underline'
                    >
                      Connectez-vous
                    </div>
                  </div>
                </Modal.Body>
              )}
            </Container>
          </Col>
          <Col className='d-none d-sm-block'>
            <img src={image} className='img-fluid img-responsive' />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Signin
