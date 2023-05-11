import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Check } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'


const ReservationModal = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [phone, setPhone] = useState()
  const [reservationEmail,setReservationEmail] = useState()
  const history = useHistory()
  const dispatch = useDispatch()
  let participants = []
  for (let index = 0; index < parseInt(props.plc); index++) {
    participants.push({nom:'',prenom : '', sexe : '', birthdate : ''})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addToCart(props.id, parseInt(props.plc), participants)).then(()=>history.push(`/panier/`))
    
  }
  let Part = () => {
    return (
      <ul>
        {Array.from(Array(parseInt(props.plc)), (e, i) => {
          return (
            <li key={i}>
              <br />
              <h4>Participant {i + 1}</h4>
              <Row>
                <Col>
                  <div className="form-group">
                    <label for="exampleInputFirstName" className="form-label">
                      Nom
                    </label>
                    <input
                      name="nom"
                      type="text"
                      className="form-control"
                      id="exampleInputFirstName"
                      placeholder="Nom"
                      onChange={(e) => participants[i].nom=e.target.value}
                      required
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label for="exampleInputFirstName" className="form-label">
                      Prénom
                    </label>
                    <input
                      name="prenom"
                      type="text"
                      className="form-control"
                      id="exampleInputFirstName"
                      placeholder="Prénom"
                      onChange={(e) => participants[i].prenom=e.target.value}
                      required
                    />
                  </div>
                </Col>

                <Col>
                  <div key={`reverse-radio`} className="mb-3">
                    <Form.Check
                      reverse
                      label="homme"
                      name="group1"
                      type="radio"
                      id={`reverse-radio-1`}
                      onChange={()=>participants[i].sexe="homme"}
                    />
                    <Form.Check
                      reverse
                      label="femme"
                      name="group1"
                      type="radio"
                      id={`reverse-radio-2`}
                      onChange={()=>participants[i].sexe="femme"}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="eventDate">
                    <Form.Label>Date de naissance</Form.Label>
                    <DatePicker
                      showIcon
                      selected={startDate}
                      onChange={(date) => participants[i].birthdate=date}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Informations sur les participants
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
        <h4>Contact</h4>
          <Row>
            <Col>
              <div className="form-group">
                <label for="exampleInputEmail1" className="form-label ">
                  Adresse e-mail
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Entrer votre adresse email"
                  onChange={(e) => setReservationEmail(e.target.value)}
                  required
                />
              </div>
            </Col>
            <Col>
            <div className="form-group">
                <label for="exampleInputFirstName" className="form-label">
                  Numéro de portable
                </label>
                <PhoneInput
                  value={phone}
                  onChange={(phone) => setPhone( phone )}
                  required
                />
            </div>
            </Col>
          </Row>
          <Part />
      </Modal.Body>
      <Modal.Footer>
        <Button type = 'submit'>Submit</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReservationModal;
