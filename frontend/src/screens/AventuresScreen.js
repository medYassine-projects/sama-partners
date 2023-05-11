import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, FormControl, Container } from 'react-bootstrap'
import axios from 'axios'
import EventCard from '../components/EventCard'
import Message from '../components/Message'
import Loader from '../components/Loader'

const AventuresScreen = ({ setCurrentId }) => {
  const [events, setEvents] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [categories, setCategories] = useState([])

  const fetchEvents = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKURL}/event/byDate/byDate`)
    setEvents(filterByName(data.data))
  }
  const filterByName = (array) => {
    return array.filter((el) =>
      nameFilter === '' ? el : el.title.includes(nameFilter)
    )
  }
  const fetchName = (name) => {
    setNameFilter(name)
  }
  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data?.data)
  }
  const fetchByCategory = async (id) => {
    setCatFilter(id)
   
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/event/byCategory/${id}`
    )
    setEvents(filterByName(data?.data))
  }

  

  useEffect(() => {
    fetchCategories()
  }, [])
  useEffect(() => {
    if (catFilter !== '') {
      fetchByCategory(catFilter)
    } else {
      fetchEvents()
    }
  }, [nameFilter, catFilter])
  return (
    <>
      <Container>
        <h1 className='py-3'>Nos Aventures</h1>
        <fieldset>
          <legend>Chercher une aventure</legend>

          <Row>
            <Col sm={12} md={6} lg={4} xl={3}>
              <label htmlFor='exampleSelect1' className='form-label mt-4'>
                Par mot
              </label>
              <FormControl
                placeholder='Rechercher par mot'
                onChange={(e) => fetchName(e.target.value)}
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <label htmlFor='exampleSelect1' className='form-label mt-4'>
                Par niveau
              </label>
              <select className='form-select' id='exampleSelect1'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <label htmlFor='exampleSelect1' className='form-label mt-4'>
                Par catégorie
              </label>
              <select
                className='form-select'
                id='exampleSelect1'
                onChange={(e) => {
                  fetchByCategory(e.target.value)
                }}
              >
                <option value='' disabled selected hidden>
                  Sélectionner une categorie
                </option>

                {categories &&
                  categories.map((el, i) => (
                    <option key={i} value={el.value}>
                      {el.label}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
        </fieldset>
        <br />
        <hr />
        <br />
        <Row>
          {events.length === 0 ? (
            // <Message>there is no events</Message>
            <Loader />
          ) : (
            events.map((event, i) => (
              <Col sm={12} md={6} lg={4} xl={3} key={i}>
                <EventCard event={event} setCurrentId={setCurrentId} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  )
}

export default AventuresScreen
