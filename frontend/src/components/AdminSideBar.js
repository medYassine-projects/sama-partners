import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import '../Dashboard.css'

const AdminSideBar = (props) => {
  return (
    <>
      <Nav
        className=' d-none d-md-block bg-light sidebar'
        activeKey='/AdminDashboard'
      >
        <div className='sidebar-sticky'></div>

        <Nav.Item>
          <LinkContainer to='/AdminDashboard'>
            <Nav.Link>
              <i className='fa fa-thin fa-house'></i>
              {'    '}Accueil
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <hr></hr>
        <Nav.Item>
          <LinkContainer to='/AdminDashboard/users'>
            <Nav.Link>
              <i className='fa fa-duotone fa-users'></i>
              {'    '}Utilisateurs
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <hr></hr>
        <Nav.Item>
          <LinkContainer to='/AdminDashboard/events'>
            <Nav.Link>
              <i className='fa fa-thin fa-calendar'></i>
              {'    '}Aventures
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <hr></hr>
        <Nav.Item>
          <LinkContainer to='/AdminDashboard/quiz'>
            <Nav.Link>
              <i className='fa fa-solid fa-question'></i>
              {'    '}Quiz
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <hr></hr>
        <Nav.Item>
          <Nav.Link eventKey='disabled' disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
const Sidebar = withRouter(AdminSideBar)
export default AdminSideBar
