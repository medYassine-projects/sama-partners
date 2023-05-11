import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faTurnUp } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import slide3 from '../images/imageslide1.jpg'
import FavoriteCategory from '../components/FavoriteCategory'
import { getUserDetails } from '../actions/userActions'
import './settings.css'
import axios from 'axios'

const UserScreen =() => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [favori,SetFavori]=useState([])
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails
  
  useEffect(() => {
    dispatch(getUserDetails(userInfo.data.id))
  }, [userInfo])

  return (
    <div>
      <Container className='py-5 px-2'>
        <Row>
          <Col md={3}>
            <img className='profile-pic-div' src={slide3} />
          </Col>
          <Col md={6} className=''>
            <div>
              <h1>{user?.data?.first_name}</h1>
              <div style={{ justifyContent: 'normal' }}>
                <i class=' fas fa-user'></i> <h3>À propos</h3>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div>
              <i class='fas fa-message'></i> Message
            </div>
          </Col>
          <Col md={3}>
            <Card>
              <FavoriteCategory />
              {user?.data?.favori?.map((fav, i) => {
                return <span key={i}>{fav.name}</span>
              })}
              {/* populate favori */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default UserScreen
