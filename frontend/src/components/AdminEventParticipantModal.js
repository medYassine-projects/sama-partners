import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { toast } from 'react-toastify'
import authHeader from '../api/auth-header'
import Loader from './Loader'

const AdminEventParticipantModal = (props) => {
  const config = {headers: authHeader()}
  const [part, setPart] = useState()
  const getParticipant = () => {
    axios
      .get(`${process.env.REACT_APP_BACKURL}/res/getParticipants/${props.index}`,config)
      .then((p) => setPart(p.data.clients)).catch((error) => {
        if (error.response.data.message === 'jwt expired') {
          toast.error('session expired, veuillez se reconnecter', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        }})
  }
  useEffect(() => {
    getParticipant()
  }, [])
  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Liste des participants
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {part &&
            part.map((participant, i) => (
              <li key={i}>
                <ul>
                  <ListItem key={participant}>
                    <ListItemText
                      primary={`${participant?.first_name} ${participant?.last_name}`}
                    />
                  </ListItem>
                </ul>
              </li>
            ))}
          {!part && <Loader></Loader>}
        </List>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant='light'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminEventParticipantModal
