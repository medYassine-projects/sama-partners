import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/auth'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const UserDropdown = () => {
  const userInfo = JSON.parse(localStorage.getItem('profile'))
  console.log(userInfo)

  const dispatch = useDispatch()
  const history = useHistory()
  const deconnexion = () => {
    dispatch(logout(history))
  }
  return (
    <div>
      <NavDropdown
        id='nav-dropdown-dark-example'
        title={userInfo?.data?.first_name}
        menuVariant='dark'
      >
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to='/favoris'>
          <NavDropdown.Item>Favoris</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/parametres'>
          <NavDropdown.Item>Paramètres</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to='/'>
          <NavDropdown.Item
            onClick={() => {
              deconnexion()
            }}
          >
            Se déconnecter
          </NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </div>
  )
}

export default UserDropdown
