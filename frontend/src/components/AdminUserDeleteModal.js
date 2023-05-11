import React from "react";
import { Container, Form, Button, Col, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify'

const AdminUserParticipantModal = (props) => {
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_BACKURL}/user/deleteUser/${props.user}`).then((res)=>{toast.warning('utilisateur supprimer avec success', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        })
      window.location.reload()})        
      }
  return (
    <Modal
    {...props}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer un utilisateur</Modal.Title>
      </Modal.Header>
      <Modal.Body>Voulez-vous vraiment supprimer cet utilisateur?</Modal.Body>
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
export default AdminUserParticipantModal

