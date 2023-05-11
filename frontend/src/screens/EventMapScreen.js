import React, { useState, useRef } from 'react'
import Maps from '../components/Maps'
import SearchBox from '../components/SearchBox'
import { Container, Row, Col } from 'react-bootstrap'

const EventMapScreen = ({loc}) => {
  const [selectPosition, setSelectPosition] = useState(null)
  console.log('selectPostion', selectPosition)
  return (
    <Container className='py-3'>
      <Row>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              border: '2px solid black',
              width: '50vw',
              height: '70%',
            }}
          >
            <Maps 
            selectPosition={selectPosition}
            select={loc(selectPosition)} />
          </div>
          <div
            style={{
              width: '50vw',
            }}
          >
            <SearchBox
              selectPosition={selectPosition}
              setSelectPosition={setSelectPosition}
            />
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default EventMapScreen
