import React, { useState } from 'react'
import Loader from './Loader'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AdminEventParticipantModal from './AdminEventParticipantModal'
import AdminEventDetailsModal from './AdminEventDetailsModal'
import AdminEventDeleteModal from './AdminEventDeleteModal'
import GalleryModal from './GalleryModal'
import moment from 'moment'
import axios from 'axios'

const EventsList = ({ events,refresh }) => {
  const [modalShow, setModalShow] = useState(false)
  const [detailsShow, setDetailsShow] = useState(false)
  const [galleryShow, setGalleryShow] = useState(false)
  const [index, setIndex] = useState()
  const [ev, setEv] = useState()
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [canDelete,setCanDelete] = useState(false)
  /*if (loading) {
    return <Loader />
  }*/
  console.log('props:',events,refresh)
  const handleActivate = (id) => {
    axios.put(`${process.env.REACT_APP_BACKURL}/event/activateEvent/${id}`).then(()=>{refresh()})
  }

  const handleCancel = (id) => {
    axios.put(`${process.env.REACT_APP_BACKURL}/event/cancelEvent/${id}`).then(()=>{refresh()})
  }
  const tableRows = events.map((event, i) => {
    const momentObj = moment(event?.eventDate)
    const momentString = momentObj.format('YYYY-MM-DD')
    return (
      <>
        <tr key={event._id}>
          <td>{event.title}</td>
          <td>{event.eventDate?event.eventDate.slice(0, 10):'à venir'}</td>
          <td>{event.canceled ? <> annulé </> : <> activé </>}</td>
          <td>
            <Button
              className='btn-primary'
              onClick={() => {
                setModalShow(true)
                setIndex(event._id)
              }}
            >
              <i className='fas fa-solid fa-users'></i>
            </Button>
          </td>
          <td>
            <Button
              className='btn-danger'
              onClick={() => {
                setGalleryShow(true)
                setIndex(event)
              }}
            >
              <i className='fa fa-thin fa-bookmark'></i>
            </Button>
          </td>
          <td>
            <LinkContainer to={`/AdminDashboard/events/${event._id}`}>
              <Button
                className='btn-info'
                onClick={() => {
                  setDetailsShow(true)
                  setEv(event)
                }}
              >
                <i className='fas fa-edit'></i>
              </Button>
            </LinkContainer>
          </td>
          <td>
            {event.canceled ?
            <Button className='btn-success'
            onClick={()=>handleActivate(event._id)}>
              <i className='far fa-check-circle'></i>
            </Button>:
            <Button
              className='btn-secondary'
              onClick={()=>handleCancel(event._id)}>
                <i className='fas fa-ban'></i>
            </Button>}
          </td>
          <td>
            <Button
              className='btn-warning'
              onClick={() => {
                axios.get(`${process.env.REACT_APP_BACKURL}/res/checkEventReservations/${event._id}`).then((res)=>{
                  console.log(res.data.canDelete)
                  if (res.data.canDelete===false){
                  alert.style={size:"100px"}
                  alert('cet event a des reservations')
                };
                setCanDelete(res.data.canDelete)
                setDeleteShow(true)
                setDeleteId(event._id)})
              }}
            >
              <i className='fas fa-trash'></i>
            </Button><div id ='alertid'></div>
          </td>
        </tr>
      </>
    )
  })

  return (
    <>
      {detailsShow ? (
        <AdminEventDetailsModal
          show={detailsShow}
          event={ev}
          onHide={() => setDetailsShow(false)}
        />
      ) : (
        <></>
      )}
      {galleryShow ? (
        <GalleryModal
          show={galleryShow}
          event={index}
          onHide={() => setGalleryShow(false)}
        />
      ) : (
        <></>
      )}
      {modalShow ? (
        <AdminEventParticipantModal
          index={index}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : (
        <></>
      )}
      {deleteShow ? (
        <AdminEventDeleteModal
          event={deleteId}
          show={deleteShow}
          delete={canDelete}
          onHide={() => setDeleteShow(false)}
        />
      ) : (
        <></>
      )}
      <Table striped size='sm' responsive='sm'>
        <thead>
          <tr>
            <th>Titre d'événement</th>
            <th>Date</th>
            <th>Status</th>
            <th>Participants</th>
            <th>Gallerie</th>
            <th>Edit</th>
            <th>Annuler/<br/>Activer</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </>
  )
}

export default EventsList
