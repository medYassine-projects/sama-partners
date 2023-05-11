import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

const EventDetails = ({ match }) => {
  const id = match.params.id.toString()

  const [event, setEvent] = useState([])

  const fetchEvent = async () => {
    const { data } = await axios.get(`/event/${id}`)
    setEvent(data)
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  return (
    <div>
      <Container className='py-5'>
        <h1>a</h1>
      </Container>
    </div>
  )
}

export default EventDetails
