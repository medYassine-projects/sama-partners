import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Col, Row, Modal } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'

const AdminCategoryModal = (props) => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState()
  const [categoryImage, setcategoryImage] = useState()

  const getCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data.data)
    console.log(categories)
  }
  const handlePhoto = (e) => {
    setcategoryImage(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('we are in submit')
    const fd = new FormData()
    fd.append('name', name)
    fd.append('categoryImage', categoryImage)
    axios.post(`${process.env.REACT_APP_BACKURL}/category/create`, fd).then((r) => {
      console.log(r)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Créé une catégorie
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} className='py-3'>
          <Row>
            <Col>
              <Form.Group controlId='name'>
                <Form.Label>Titre de catégorie</Form.Label>
                <Col>
                  <Form.Control
                    name='name'
                    type='text'
                    placeholder='Ajouter une catégorie'
                    required
                    aria-label='Ajouter une catégorie'
                    aria-describedby='addCategory'
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Col>
                  <Form.Control
                    name='categoryImage'
                    type='file'
                    placeholder='Image'
                    onChange={handlePhoto}
                    required
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <div className='py-2'>
            <Button className='btn btn-info' type='submit' id='addCategory'>
              Ajouter
            </Button>
          </div>
        </Form>
        <hr></hr>
        <h3>Liste des catégories</h3>
        <Row className='py-2'>
          {categories &&
            categories?.map((e, i) => {
              return (
                <Col key={i}>
                  <div
                    className='card text-white bg-success mb-3 '
                    style={{ maxWidth: '20rem' }}
                  >
                    <div className='card-header'>
                      <Row>
                        <Col md={8}>{e.label}</Col>

                        <Col>
                          <Button variant='warning'>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              )
            })}
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} variant='light'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminCategoryModal
