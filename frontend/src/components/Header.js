import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import Singin from './Signin'
import { useDispatch, useSelector } from 'react-redux'
import { logout, getUserDetails } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = React.useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const u = JSON.parse(localStorage.getItem('userInfo'))
  //console.log(u)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(getUserDetails(userInfo?.data?.id))
  }, [userInfo])

  return (
    <header>
      <Navbar
        bg='primary'
        variant='dark'
        expand='lg'
        collapseOnSelect
        fixed='top'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Eventura</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/aventures'>
                <Nav.Link>Aventures</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/quizz'>
                <Nav.Link>Quizz</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/nous'>
                <Nav.Link>Qui somme-nous ?</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contactez-nous'>
                <Nav.Link>Contactez-nous</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className='ms-auto'>
              {userInfo?.data?.role === 'admin' ? (
                <>
                  <LinkContainer to='/AdminDashBoard'>
                    <Nav.Link>Admin Pannel</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    id='username'
                    title={u?.data?.first_name}
                    menuVariant='dark'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/parametres'>
                      <NavDropdown.Item>Paramètres</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/favori'>
                      <NavDropdown.Item>favori</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to='/'>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Se déconnecter
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <img
                    className='rounded-circle shadow-1-strong me-3 profile-pic-post mx-2'
                    style={{ height: '40px', width: '40px' }}
                    src={`${process.env.REACT_APP_BACKURL}/${user?.data?.userImage?.slice(
                      8,
                      user?.data?.userImage?.length
                    )}`}
                  />
                </>
              ) : userInfo?.data?.role === 'supervisor' ? (
                <>
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    id='username'
                    title={u?.data?.first_name}
                    menuVariant='dark'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/parametres'>
                      <NavDropdown.Item>Paramètres</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/favori'>
                      <NavDropdown.Item>favori</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to='/'>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Se déconnecter
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <img
                    className='rounded-circle shadow-1-strong me-3 profile-pic-post mx-2'
                    style={{ height: '40px', width: '40px' }}
                    src={`${process.env.REACT_APP_BACKURL}/${user?.data?.userImage?.slice(
                      8,
                      user?.data?.userImage?.length
                    )}`}
                  />
                </>
              ) : userInfo?.data?.role === 'basic' ? (
                <>
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/calendrier'>
                    <Nav.Link>Calendrier</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/panier'>
                    <Nav.Link>
                      <i className='fa fa-solid fa-cart-shopping'></i> Panier
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    id='username'
                    title={u?.data?.first_name}
                    menuVariant='dark'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/parametres'>
                      <NavDropdown.Item>Paramètres</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/favori'>
                      <NavDropdown.Item>favori</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to='/'>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Se déconnecter
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <img
                    className='rounded-circle shadow-1-strong me-3 profile-pic-post mx-2'
                    style={{ height: '40px', width: '40px' }}
                    src={`${process.env.REACT_APP_BACKURL}/${user?.data?.userImage?.slice(
                      8,
                      user?.data?.userImage?.length
                    )}`}
                  />
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setModalShow(true)}>
                    Se connecter
                  </Nav.Link>
                  <Singin show={modalShow} onHide={() => setModalShow(false)} />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
