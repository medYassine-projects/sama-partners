import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify'
import {useSelector} from 'react-redux'

const FavoriDeleteModal = (props) => {
  const userId = useSelector(state=>state.userLogin.userInfo.data.id)
  console.log('user',userId)
    const handleDelete = () => {
        axios.patch(`${process.env.REACT_APP_BACKURL}/user/supprimerFavori/${userId}`,{favori:props.favori}).then((res)=>{toast.warning('favori supprimer avec success', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        })})        
      }
    console.log('props',props)
  return (
    <Modal
    {...props}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer favori</Modal.Title>
      </Modal.Header>
      <Modal.Body>Voulez-vous vraiment supprimer cette catégorie du favori?</Modal.Body>
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
export default FavoriDeleteModal

