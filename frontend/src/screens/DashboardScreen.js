import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import DashBoardEvent from '../components/DashBoardEvent'
import { useSelector } from 'react-redux'

const DashboardScreen = () => {
  const history = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      {!userInfo ? (
        history.push('/')
      ) : (
        <Row>
          <DashBoardEvent />
        </Row>
      )}
    </div>
  )
}

export default DashboardScreen
