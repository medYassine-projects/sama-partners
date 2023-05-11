import React, { useState,useEffect } from 'react'
import { Button, Col, Row, Container, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import {
  faTasks,
  faSearch,
  faMapLocation,
} from '@fortawesome/free-solid-svg-icons'
import Slider from '../components/Slider'
import CardList from '../components/CardList'
import { useSelector, useDispatch } from 'react-redux'
import CardListLastEvents from '../components/CardListLastEvents'
import { getUserDetails } from '../actions/userActions'
import HomeHeader from '../components/HomeHeader'
import cardImage from '../images/hicking.jpg'
import axios from 'axios'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState()

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const getCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data.data)
  }
   useEffect(() => {
    getCategories()
   },[])
   

  return (
    <div>
      <div>
        <Slider />
      </div>

      <Container>
        <Row>
          {categories &&
            categories?.map((cat, i) => {
              return (
              <Col md={4}>
                <div className='category-card-wrapper cursor-pointer'>
                  <img
                    src={`${process.env.REACT_APP_BACKURL}/${cat.img.slice(
                      8,
                      cat.img.length
                    )}`}
                    className='category-image'
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <h3 className='category-txt'>{cat.label}</h3>
                </div>
              </Col>)
              })}
        </Row>
      </Container>

      <HomeHeader />

      <br />
      <span></span>
      <h1 align='center'>Notre Idée</h1>
      <Container>
        <Row align='center'>
          <Col>
            <Card className='shadow p-3 mb-5 bg-white rounded'>
              <br />
              <FontAwesomeIcon icon={faSearch} size='6x' className='facolor' />

              <Card.Title>Découvrez</Card.Title>
              <Card.Text align='center'>
                <Container>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Container>
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <Card className='shadow p-3 mb-5 bg-white rounded'>
              <br />
              <FontAwesomeIcon icon={faTasks} size='6x' className='facolor' />

              <Card.Title>Créez</Card.Title>
              <Card.Text align='center'>
                <Container>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Container>
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <Card className='shadow p-3 mb-5 bg-white rounded'>
              <br />
              <FontAwesomeIcon
                icon={faCalendarDays}
                size='6x'
                className='facolor'
              />

              <Card.Title>Planifiez</Card.Title>
              <Card.Text align='center'>
                <Container>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Container>
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <Card className='shadow p-3 mb-5 bg-white rounded'>
              <br />
              <FontAwesomeIcon
                icon={faMapLocation}
                size='6x'
                className='facolor'
              />

              <Card.Title>Partez</Card.Title>
              <Card.Text align='center'>
                <Container>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Container>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <hr className='my-5' />
        <CardListLastEvents />
        {user?.data?.favori.map((categoryId, i) => (
          <>
            <h2> Pour vous</h2>
            <CardList cat={categoryId} />
          </>
        ))}
      </Container>
    </div>
  )
}

export default HomeScreen
