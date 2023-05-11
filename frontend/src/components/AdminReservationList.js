import React, { useState, useEffect } from 'react'
import ReservationList from './ReservationList'
import Loader from '../components/Loader'

import Pagination from './Pagination'
import axios from 'axios'
import authHeader from '../api/auth-header'
import { toast } from 'react-toastify'

const AdminReservationList = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [reservationsPerPage] = useState(6)

  const config = {headers: authHeader()}
    const fetchReservations = () => {
      
       axios.get(`${process.env.REACT_APP_BACKURL}/res/getReservations`,config).then((res)=>{
       setReservations(res.data.data)
       }).catch((error) => {
        if (error.response.data.message === 'jwt expired') {
          toast.error('session expired, veuillez se reconnecter', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        }})
      
    }
  useEffect(() => {
    setLoading(true)
    fetchReservations()
    setLoading(false)
  }, [])

  const indexOfLastReservation = currentPage * reservationsPerPage
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage
  const currentReservations = reservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (<div>{reservations.length===0? (<Loader/>) :(
  <><ReservationList reservations={currentReservations} />
  <div className='d-flex justify-content-center'>
    <Pagination
      usersPerPage={reservationsPerPage}
      totalUsers={reservations.length}
      paginate={paginate}
    />
  </div></>)
}</div>
  )
}

export default AdminReservationList
