import React from 'react'
import { Container } from 'react-bootstrap'
import CreateEvent from '../components/CreateEvent'

const CreateEventScreen = () => {
  return (
    <div>
      <Container className='py-5'>
        <CreateEvent />
      </Container>
    </div>
  )
}

export default CreateEventScreen
