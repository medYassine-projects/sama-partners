import React, { useState } from 'react'
import Loader from './Loader'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AdminUserDetailsModal from './AdminUserDetailsModal'
import AdminUserDeleteModal from './AdminUserDeleteModal'

const UsersList = ({ users }) => {
  const [modalShow, setModalShow] = useState(false)
  const [deleteShow,setDeleteShow] = useState()
  const [deleteId,setDeleteId] = useState()
  const [us,setUs] = useState()
  const tableRows = users.map((user) => {
    return (
      <>
        <tr key={user.id}>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>

          <td>
            <Button className='btn-info' onClick={() => {setModalShow(true);setUs(user)}}>
              <i className='fas fa-edit'></i>
            </Button>
          </td>
          <td>
            <Button className='btn-warning' onClick={()=>{setDeleteShow(true);setDeleteId(user._id)}}>
              <i className='fas fa-trash'></i>
            </Button>
          </td>
        </tr>
      </>
    )
  })

  return (
    <>{modalShow ? (<AdminUserDetailsModal
      show={modalShow}
      user={us}
      onHide={() => setModalShow(false)}
    />):<></>}
    {deleteShow ?(<AdminUserDeleteModal
      user={deleteId}
      show={deleteShow}
      onHide={() => setDeleteShow(false)}
    />):<></>}
    <Table striped size='sm'>
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table></>
  )
}

export default UsersList
