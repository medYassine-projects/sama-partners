import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button, Col, Row, Modal } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const CreateQuizModal = (props) => {
  const [val, setVal] = useState([])
  const [name,setName] = useState()
  const [ques,setQues] = useState([])
  const [categories, setCategories] = useState([])
  const [cat, setCat] = useState()
  const [dis,setDis] = useState(false)
  const [disable,setDisable]= useState(true)

  const history=useHistory()
  const qObject = { question: '', answers: [] }
  var rep1 = null
  var rep2 = null
  var rep3 = null
  var rep4 = null
  var score1 = null
  var score2 = null
  var score3 = null
  var score4 = null

  var answObject1 = { option: '', optionScore: '' }
  var answObject2 = { option: '', optionScore: '' }
  var answObject3 = { option: '', optionScore: '' }
  var answObject4 = { option: '', optionScore: '' }
  const handleAdd = () => {
    const question = [...val, []]
    setVal(question)
    console.log('clicked')
    rep1 = null
    rep2 = null
    rep3 = null
    rep4 = null
    score1 = null
    score2 = null
    score3 = null
    score4 = null
    answObject1 = { option: '', optionScore: '' }
    answObject2 = { option: '', optionScore: '' }
    answObject3 = { option: '', optionScore: '' }
    answObject4 = { option: '', optionScore: '' }
  }

  const handleChange = (onChangeValue, i) => {
    const inputData = [...val]
    inputData[i] = onChangeValue.target.value
    setVal(inputData)
  }

  const handleDelete = (i) => {
    const deletVal = [...val]
    deletVal.splice(i, 1)
    setVal(deletVal)
  }
  const validerQ = () => {
    if (rep1) {
      answObject1.option = rep1
      answObject1.optionScore = score1
      qObject.answers.push(answObject1)
    }
    if (rep2) {
      answObject2.option = rep2
      answObject2.optionScore = score2
      qObject.answers.push(answObject2)
    }
    if (rep3) {
      answObject3.option = rep3
      answObject3.optionScore = score3
      qObject.answers.push(answObject3)
    }
    if (rep4) {
      answObject4.option = rep4
      answObject4.optionScore = score4
      qObject.answers.push(answObject4)
    }

    ques.push(qObject)
    console.log('yala', ques)
    document.getElementById('question').value = ''
    document.getElementById('reponse1').value = ''
    document.getElementById('reponse2').value = ''
    document.getElementById('reponse3').value = ''
    document.getElementById('reponse4').value = ''
    document.getElementById('score1').value = ''
    document.getElementById('score2').value = ''
    document.getElementById('score3').value = ''
    document.getElementById('score4').value = ''
    

    //handleAdd
    const question = [...val, []]
    setVal(question)
    rep1 = null
    rep2 = null
    rep3 = null
    rep4 = null
    score1 = null
    score2 = null
    score3 = null
    score4 = null
    answObject1 = { option: '', optionScore: '' }
    answObject2 = { option: '', optionScore: '' }
    answObject3 = { option: '', optionScore: '' }
    answObject4 = { option: '', optionScore: '' }
    setDisable(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_BACKURL}/quiz/createQuiz`,{name:name,
                                                        questions:ques,
                                                        categorie:cat})
              .then((res)=>{
                toast.success('quiz créer avec success', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                })
                history.push('/AdminDashboard/quiz')
              })
              .catch((err)=>{
                toast.error('erreur', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                })
              })
  }

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data?.data)
  }

  useEffect(() => {
    fetchCategories()
    console.log(categories)
  }, [])

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Créer un quiz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={7}>
              <div className='form-group'>
                <label for='exampleInputEmail1' className='form-label mt-2'>
                  Titre de quiz
                </label>
                <input
                  name='question'
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  placeholder='Entrer titre de quiz'
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
            </Col>
            <Col md={5}>
              <Form.Group className='py-2'>
                <Form.Label>Catégorie</Form.Label>
                <select
                  name='categorie'
                  className='form-select'
                  id='exampleSelect1'
                  onChange={(e) => setCat(e.target.value)}
                >
                  <option disabled selected hidden>
                    Sélectionner une categorie
                  </option>

                  {categories &&
                    categories?.map((el, i) => (
                      <option name='categorie' key={i} value={el.value}>
                        {el?.label}
                      </option>
                    ))}
                </select>
              </Form.Group>
            </Col>
          </Row>

          
              <div>
                <hr></hr>
                <Row>
                  <Row>
                    <Col md={11}>
                      <div className='form-group'>
                        <label
                          for='exampleInputEmail1'
                          className='form-label mt-2'
                        >
                          Question
                        </label>
                        <input
                          //value={data}
                          name='question'
                          type='text'
                          className='form-control'
                          id='question'
                          placeholder='Entrer votre question'
                          onBlur={(e) => {
                            qObject.question = e.target.value
                          }}
                          //onChange={(e) => handleChange(e, i)}
                        />
                      </div>
                    </Col>
                    {/*<Col md={1}>
                      <div className='py-4'>
                        <Button
                          className='mt-3 btn-danger px-3'
                          onClick={() => handleDelete()}
                        >
                          <i className='fa fa-duotone fa-xmark'></i>
                        </Button>
                      </div>
                        </Col>*/}
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={9}>
                          <div className='form-group'>
                            <label for='reponse1' className='form-label mt-2'>
                              Réponse 1
                            </label>
                            <input
                              name='reponse1'
                              type='text'
                              className='form-control'
                              id='reponse1'
                              placeholder='text'
                              onChange={(e) => {
                                rep1 = e.target.value
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={3} className='py-2'>
                          <Form.Group>
                            <Form.Label>Score</Form.Label>

                            <Form.Control
                              name='Score'
                              id='score1'
                              type='number'
                              min='1'
                              max='50'
                              placeholder='0'
                              onChange={(e)=>{score1=e.target.value;
                                }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={9}>
                          <div className='form-group'>
                            <label for='reponse1' className='form-label mt-2'>
                              Réponse 2
                            </label>
                            <input
                              name='reponse2'
                              type='text'
                              className='form-control'
                              id='reponse2'
                              placeholder='text'
                              onBlur={(e) => {
                                rep2 = e.target.value
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={3} className='py-2'>
                          <Form.Group>
                            <Form.Label>Score</Form.Label>

                            <Form.Control
                              name='Score'
                              type='number'
                              id='score2'
                              min='1'
                              max='50'
                              placeholder='0'
                              onBlur={(e)=>{score2=e.target.value;
                                }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={9}>
                          <div className='form-group'>
                            <label for='reponse1' className='form-label mt-2'>
                              Réponse 3
                            </label>
                            <input
                              name='reponse3'
                              type='text'
                              className='form-control'
                              id='reponse3'
                              placeholder='text'
                              onBlur={(e) => {
                                rep3 = e.target.value
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={3} className='py-2'>
                          <Form.Group>
                            <Form.Label>Score</Form.Label>

                            <Form.Control
                              name='Score'
                              type='number'
                              id='score3'
                              min='1'
                              max='50'
                              placeholder='0'
                              onBlur={(e)=>{score3=e.target.value;
                                }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={9}>
                          <div className='form-group'>
                            <label for='reponse1' className='form-label mt-2'>
                              Réponse 4
                            </label>
                            <input
                              name='reponse4'
                              type='text'
                              className='form-control'
                              id='reponse4'
                              placeholder='text'
                              onBlur={(e) => {
                                rep4 = e.target.value
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={3} className='py-2'>
                          <Form.Group>
                            <Form.Label>Score</Form.Label>

                            <Form.Control
                              name='Score'
                              type='number'
                              id='score4'
                              min='1'
                              max='50'
                              placeholder='0'
                              onBlur={(e)=>{score4=e.target.value;
                              }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
                <div className='text-center py-2'>
                  <Button onClick={validerQ} variant='success'>
                    valider question
                  </Button>
                </div>
              </div>
          
          {/*<div className='py-3'>
            <Button onClick={() => handleAdd()}>
              <i className='fa fa-light fa-plus'></i> {'  Nouvelle question'}
            </Button>
                            </div>*/}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant='secondary'>
            Fermer
          </Button>
          <Button variant='info' type='submit' disabled={disable}>
            Créer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateQuizModal
