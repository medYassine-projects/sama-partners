import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Modal,
  Badge,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from "moment";
import EventMapScreen from "../screens/EventMapScreen";
import { useDispatch } from "react-redux";
import { updateEvent } from "../actions/events";
import authHeader from '../api/auth-header'
import { toast } from 'react-toastify'

const AdminEventDetailsModal = (props) => {
  //console.log(props)
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const [categories, setCategories] = useState([]);

  const [eventLon, setEventLon] = useState();
  const [eventLat, setEventLat] = useState();
  const [multiple, setMultiple] = useState();
  const [select, setSelect] = useState();
  const [places, setPlaces] = useState();

  const [desc,setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [duration,setDuration] =useState('')
  const [niveau,setNiveau]=useState('')

  const dispatch = useDispatch()
  const config = {headers: authHeader()}
  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`,config
    );
    setCategories(data?.data);
  };

  const handlePhoto = (e) => {
    setMultiple(e.target.files[0])
  }
  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);

  const dateLimit = moment(props.event?.eventDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const now = moment();

  const momentObj = moment(props.event?.eventDate);
  const momentString = momentObj.format("YYYY-MM-DD");
  const handleSubmit =async (e) => {
    e.preventDefault();
    const fd = new FormData()
    if(title){
      fd.append('title',title)
    }
    if (desc){
      console.log('desc')
      fd.append('description',desc)
    }
    if (multiple){
        fd.append('eventImage', multiple)
    }
    if (duration){
      fd.append('duration',duration)
    }
    if (niveau){
      fd.append('niveauMin',niveau)
    }
  axios.put(
    `${process.env.REACT_APP_BACKURL}/event/${props.event._id}`,fd).then((res)=> {
      console.log(res)
      if (res?.data?.acknowledged){
        toast.success('Evenement modifier avec success', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
        props.onHide()
      }else if (!res?.data?.acknowledged){
        toast.success('Rien à changer', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        })
        props.onHide()
      }
      else {toast.error('oops! il y a un e erreur', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })}
     })
  };
  const loc = (l) => {
    console.log("ken mchet rani m3alem");
    /*setFormData({...formData, places:{display_name:l?.display_name,
                                      lon:l?.lon,
                                      lat:l?.lat}})*/
    console.log(l);
    setSelect(l);
    console.log(select);
    setPlaces(l?.display_name);
    setEventLon(l?.lon);
    setEventLat(l?.lat);
    //setFormData({...formData, places:dis})
  };
  const urlImage = props.event?.galerie[0]?.slice(
    8,
    props.event?.galerie[0]?.length
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.event?.title} {"  "}
          <Badge bg="danger">
            categorie
            {props.event?.categorie?.name}
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <img
                src={`${process.env.REACT_APP_BACKURL}/${urlImage}`}
                style={{ width: "400px", height: "400px" }}
              />
            </Col>
            <Col>
              <Badge bg="light">
                <i className="fa fa-solid fa-user"></i> Organiser par:{" "}
                {props.event?.organizer?.first_name}{" "}
                {props.event?.organizer?.last_name}
              </Badge>
              {"  "}
              <Badge bg="info">
                <i className="fa fa-light fa-user-plus"></i> Places restants:{" "}
                {props.event?.numberOfPlacesLeft}
              </Badge>{" "}
              <Badge bg="warning">
                <i className="fa fa-thin fa-tag"></i> Prix: {props.event?.price}
                {" dt"}
              </Badge>
              <Row>
                <Col>
                  <Badge bg="secondary">
                    <i className="fa fa-thin fa-tag"></i> Date: {momentString}
                  </Badge>{" "}
                  <Badge bg="secondary">
                    <i className="fa fa-thin fa-tag"></i> Heur de départ:{" "}
                    {props.event?.departHour}
                  </Badge>
                </Col>
              </Row>
            </Col>
          </Row>

          <Accordion defaultActiveKey="0" className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Information générale</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Titre d'aventure</Form.Label>
                      <Col>
                        <Form.Control
                          name="title"
                          type="text"
                          placeholder={props.event?.title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Niveau</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name="niveauMin"
                          type="number"
                          max="5"
                          min="1"
                          placeholder={props.event?.niveauMin}
                          onChange={(e)=>setNiveau(e.target.value)}
                          
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="py-2" controlId="desc">
                      <Form.Label for="textarea">Description</Form.Label>
                      <Col md={9}>
                        <textarea
                          name="description"
                          className="form-control"
                          id="textarea"
                          rows="3"
                          style={{ fontSize: "14px" }}
                          placeholder={props.event?.description}
                          onChange={(e)=>{setDesc(e.target.value)}}
                        ></textarea>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="places" className="py-2">
                      <Form.Label>Nom des lieux à visité</Form.Label>
                      <Col>
                        <Form.Control
                          name="places"
                          type="text"
                          value={props.event?.places}
                          
                        ></Form.Control>
                        <small>
                          Séparez les lieux avec un , Exemple: "Douz,
                          Matamata..."
                        </small>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <div style={{ width: "100%" }} className="py-3">
                    <Form.Group controlId="formFileSm" className="mb-3 mt-1">
                      <Form.Label>
                        Ajouter une image pour votre événement
                      </Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        size="sm"
                        onChange={handlePhoto}
                      />
                    </Form.Group>
                  </div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Details d'événement</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="eventDate">
                      <Form.Label>Sélectionnez une date</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date = Date) => setStartDate(date)}
                        
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="departHour">
                      <Form.Label>Sélectionnez heure de départ</Form.Label>
                      <br />
                      <TimePicker
                        name="departHour"
                        onChange={onChange}
                        value={value}
                        
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="py-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Durée :</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name="duration"
                          type="number"
                          min="1"
                          placeholder={props.event?.duration}
                          onChange={(e)=>{setDuration(e.target.value)}}
                          
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <select
                        name="categorie"
                        className="form-select"
                        id="exampleSelect1"
                      >
                        <option disabled selected hidden>
                          {props.event?.categorie?.name}
                        </option>

                        {categories &&
                          categories?.map((el, i) => (
                            <option name="categorie" key={i} value={el.value}>
                              {el?.label}
                            </option>
                          ))}
                      </select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Capacité</Form.Label>
                      <Col md={6}>
                        <Form.Control
                          name="capacity"
                          type="number"
                          min="1"
                          placeholder={props.event?.capacity}
                          
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Prix :</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Form.Control
                            name="price"
                            type="number"
                            min="1"
                            placeholder={props.event?.price}
                            
                          ></Form.Control>{" "}
                        </Col>
                        <Col>DT $ </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Localisation</Accordion.Header>
              <Accordion.Body>
                <EventMapScreen loc={loc} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
      
      <Modal.Footer>
        <Button type="submit" variant="success">
          Update
        </Button>
        <Button onClick={props.onHide} variant="light">
          Close
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AdminEventDetailsModal;
