import React, { useState } from 'react'
import { Button, Col, Row, Container, Form } from 'react-bootstrap'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PlaceIcon from '@mui/icons-material/Place'
import Divider from '@material-ui/core/Divider'

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?'
const params = {
  q: '',
  format: 'json',
  addressdetails: 'addressdetails',
}

const SearchBox = (props) => {
  const { selectPosition, setSelectPosition } = props
  const [searchText, setSearchText] = useState('')
  const [listPlace, setListPlace] = useState([])

  return (
    <Container className='py-3'>
      <Row>
        <Col>
          <Form.Control
            type='text'
            placeholder='Lieux à chercher'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          ></Form.Control>
        </Col>
        <Col>
          <Button
            variant='success'
            onClick={() => {
              const params = {
                q: searchText,
                format: 'json',
                addressdetails: 1,
                polygon_geojson: 0,
              }
              const queryString = new URLSearchParams(params).toString()
              const requestOptions = {
                method: 'GET',
                redirect: 'follow',
              }
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result))
                  setListPlace(JSON.parse(result))
                })
                .catch((err) => console.log('err: ', err))
            }}
          >
            Chercher
          </Button>
        </Col>
        <div>
          <List component='nav' aria-label='main mailbox folders'>
            {listPlace.map((item) => {
              return (
                <div key={item?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectPosition(item)
                    }}
                  >
                    <ListItemIcon>
                      <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText primary={item?.display_name} />
                  </ListItem>
                  <Divider />
                </div>
              )
            })}
          </List>
        </div>
      </Row>
    </Container>
  )
}

export default SearchBox
