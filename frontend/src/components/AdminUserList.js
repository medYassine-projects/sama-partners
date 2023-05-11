import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Col, Row } from 'react-bootstrap'
import { getUsers } from '../api/index'
import UsersList from './UsersList'
import Pagination from './Pagination'
import CreateUserModal from './CreateUserModal'
import authHeader from '../api/auth-header'
import Loader from '../components/Loader'
import { ToastContainer, toast } from 'react-toastify'

const AdminUserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(6)
  const [nameFilter, setNameFilter] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const filterByName = (array) => {
    if (nameFilter === '') {
      return array
    } else {
      return array.filter((el) =>
        el.first_name ? el?.first_name.includes(nameFilter) : false
      )
    }
  }

  const fetchName = (name) => {
    setNameFilter(name)
  }

  const config = { headers: authHeader() }
  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKURL}/user/getUsers`, config)
      .then((res) => {
        setUsers(filterByName(res.data.data))
      })
      .catch((error) => {
        console.log(error)
        if (error?.response?.data?.message === 'jwt expired') {
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
  }, [nameFilter])
  // Get current posts

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Container className='py-3'>
      <Row>
        <div className='card-wrapper'>
          <Row>
            <Container className='py-3'>
              <div className='card-wrapper-box'>
                <Row>
                  <Col>
                    {' '}
                    <div
                      className=' d-flex justify-content-left py-3 px-5'
                      style={{ color: 'white' }}
                    >
                      <i
                        className='fa fa-duotone fa-users fa-6x'
                        align='center'
                      >
                        <h5>Nombre totale des utilisateurs</h5>
                      </i>
                    </div>
                  </Col>

                  <Col>
                    <div
                      className='d-flex justify-content-center p-2 py-3 cursor-pointer '
                      style={{ color: 'white' }}
                      onClick={() => setModalShow(true)}
                    >
                      <i className='fa fa-solid fa-plus fa-6x ' align='center'>
                        <h6>Créer un utilisateur</h6>
                      </i>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </Row>

          <CreateUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <Row>
            <h5 className='px-5 '>Chercher un utilisateur</h5>
            <div className='input-group px-5'>
              <div className='form-outline'>
                <input
                  type='search'
                  id='form1'
                  className='form-control '
                  onChange={(e) => fetchName(e.target.value)}
                  placeholder='Chercher par Prénom'
                />
              </div>
            </div>
            {users.length === 0 ? (
              // <Message>there is no events</Message>
              <Loader />
            ) : (
              <Container>
                <UsersList users={currentUsers} />

                <div className='d-flex justify-content-center'>
                  <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={users.length}
                    paginate={paginate}
                  />
                </div>
              </Container>
            )}
          </Row>
        </div>
      </Row>
    </Container>
  )
}

export default AdminUserList
