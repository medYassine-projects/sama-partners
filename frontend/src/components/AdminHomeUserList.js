import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Col, Row, Button, Table } from 'react-bootstrap'
import Pagination from './Pagination'
import authHeader from '../api/auth-header'
import Loader from '../components/Loader'
import UsersListCard from './UsersListCard'
import { ToastContainer, toast } from 'react-toastify'

const AdminHomeUserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(6)

  const config = { headers: authHeader() }
  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKURL}/user/getUsers`, config)
      .then((res) => {
        setUsers(res.data.data)
        console.log('it s ok')
      })
      .catch((error) => {
        if (error.response.data.message === 'jwt expired') {
          toast.error('session expired, veuillez se reconnecter', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        } else {
          toast.error('something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        }
      })
  }
  useEffect(() => {
    setLoading(true)
    fetchUsers()
    setLoading(false)
  }, [])

  // Get current posts

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <Row>
        <Container>
          <UsersListCard users={currentUsers} />
          <div className='d-flex justify-content-center'>
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={users.length}
              paginate={paginate}
            />
          </div>
        </Container>
      </Row>
    </div>
  )
}

export default AdminHomeUserList
