import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import Loader from '../components/Loader'

const ReservationList = ({ reservations, loading }) => {
  if (loading) {
    return <Loader />
  }
  
  const tableRows = reservations.map((reservation) => {
    const event = []
    reservation.event.forEach(e => {
      event.push(e.title)
    });
    return (
      <>
        <tr key={reservation._id}>
          <td>{reservation._id}</td>
          <td>{event.toString()}</td>
          <td>{reservation?.user[0]?.first_name}</td>
          <td>{reservation.nombre_de_place}</td>
          <td>{reservation.prix_total}</td>
        </tr>
      </>
    )
  })
  return (
    <div>
      <Table striped responsive>
        <thead>
          <th>id_réservation</th>
          <th>Aventures</th>
          <th>Utilisateur</th>
          <th>Nombre des places</th>
          <th>Prix totale</th>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </div>
  )
}

export default ReservationList
