import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, ListGroup, Row } from 'react-bootstrap'
import * as api from '../api/index'
import { getChatMessages } from '../actions/chatActions'
import './Sidebar.css'

const Sidebar = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails
  const [chatRooms, setChatRooms] = useState([])
  const [ref, setRef] = useState(false)

  const dispatch = useDispatch()

  const getChat = useSelector((state) => state.getChat)
   const { chats } = getChat
  console.log('rooms', getChat)
  console.log(user)
  useEffect(() => {
    dispatch(getChatMessages(user?.data?._id))
    setRef(true)
  }, [])
  console.log('userId=====', user?.data?._id)
  return (
    <div>
      <h2>Available rooms</h2>
      <ListGroup>
        <ListGroup.Item
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          { chats.length === 0 ? (
            <span>no room available</span>
          ) : (
            chats?.chats?.map((e, i) => (
              <span className='badge rounded-pill bg-primary'>
                {e.chatName}
              </span>
            ))
          )} 
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default Sidebar
