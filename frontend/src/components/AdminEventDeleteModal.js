import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify'

const AdminEventDeleteModal = (props) => {
    
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_BACKURL}/event/${props.event}`).then((res)=>{toast.warning('Evenement supprimer avec success', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        })
        window.location.reload()
      })        
      }
      const handleCancel = () => {
        axios.put(`${process.env.REACT_APP_BACKURL}/event/cancelEvent/${props.event}`).then((res)=>{toast.warning('Evenement desactiver avec success', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
      })})
      }
      
  return (
    <Modal
    {...props}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer un événement</Modal.Title>
      </Modal.Header>
      <Modal.Body>Voulez-vous vraiment supprimer cet événement?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Annuler
        </Button>
        {props.delete ?<Button
          variant="primary"
          onClick={()=>{handleDelete();
        props.onHide()}}
        >
          Oui
        </Button>
        
         :(<Button
          variant="primary"
          onClick={()=>{handleCancel();
        props.onHide()}}
        >
          désactiver
        </Button>)}
        
      </Modal.Footer>
    </Modal>
  );
};
export default AdminEventDeleteModal

