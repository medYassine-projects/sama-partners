import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Col, Row, Modal } from 'react-bootstrap'
import axios from 'axios'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import { toast } from 'react-toastify'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
]

const GalleryModal = (props) => {
  const [multiple, setMultiple] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    Object.values(multiple).forEach((file) => {
      fd.append('galerie', file)
    })
    axios.patch(`${process.env.REACT_APP_BACKURL}/event/${props.event._id}`, fd).then((ok)=>{toast.success('gallerie modifier avec success', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
    props.onHide()
  }).catch((err)=>{
      console.log(err.response.data.slice(104,162))
    if (err.response.data.slice(104,162)==='ExtensionError: Only .jpg .jpeg .png images are supported!')
    {
      toast.error(err.response.data.slice(104,162), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })}
    if (err.response.data.slice(110,131)==='Error: File too large')
    {
      toast.error(err.response.data.slice(110,131), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
  }
    })
  }

  const handleMultiple = (e) => {
    setMultiple(e.target.files)
    console.log(multiple)
  }
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Gallerie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={9}>
                <Form.Group controlId='formFileSm' className='mb-3 mt-1'>
                  <Form.Label>
                    Ajouter des images pour votre événement
                  </Form.Label>
                  <Form.Control
                    type='file'
                    multiple
                    accept='image/*'
                    size='sm'
                    onChange={handleMultiple}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <div className='py-4'>
                  <Button
                    className='btn btn-info mt-1'
                    type='submit'
                    id='addCallergy'
                    disabled={multiple.length===0}
                  >
                    Ajouter
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>

          <hr></hr>
          <Container>
            <SimpleReactLightbox>
              <SRLWrapper>
                <ImageList
                  sx={{ width: 500, height: 450 }}
                  variant='quilted'
                  cols={4}
                  rowHeight={121}
                >
                  {props.event?.galerie?.map((item, index) => (
                    <ImageListItem
                      key={item}
                      cols={item.cols || 1}
                      rows={item.rows || 1}
                    >
                      <img
                        {...srcset(
                          `${process.env.REACT_APP_BACKURL}/${item.slice(8, item.length)}`,
                          121,
                          item.rows,
                          item.cols
                        )}
                        alt={item.title}
                        loading='lazy'
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </SRLWrapper>
            </SimpleReactLightbox>
          </Container>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant='light'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GalleryModal
