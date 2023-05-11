import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify'
import authHeader from '../api/auth-header'

const AdminQuizDeleteModal = (props) => {
  const config = { headers: authHeader() }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_BACKURL}/quiz/${props.quiz}`,config).then((res)=>{toast.warning('quiz supprimer avec success', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        })
        window.location.reload()
      })        
      }
  return (
    <Modal
    {...props}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer un quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>Voulez-vous vraiment supprimer cet quiz?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Annuler
        </Button>
        <Button
          variant="primary"
          onClick={()=>{handleDelete();
        props.onHide()}}
        >
          Oui
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AdminQuizDeleteModal

