import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './MessageForm.css'

const MessageForm = () => {
  return (
    <>
      <div className='messages-output'>
        <div className='alert alert-info'>
          You are in the "currentRoomName" room
        </div>

        <>
          <div className='alert alert-info conversation-info'>
            <div>
              Your conversation with "privateMemberMsg.name"{' '}
              <img className='conversation-profile-pic' />
            </div>
          </div>
        </>

        {/* {!user && <div className="alert alert-danger">Please login</div>} */}

        <div>
          <p className='alert alert-info text-center message-date-indicator'>
            date
          </p>
          <div className=' message  incoming-message'>
            <div className='message-inner'>
              <div className='d-flex align-items-center mb-3'>
                <img
                  style={{
                    width: 35,
                    height: 35,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginRight: 10,
                  }}
                />
                <p className='message-sender'>
                  "sender._id == user?._id ?" "You" : "sender.name"
                </p>
              </div>
              <p className='message-content'>message contetn</p>
              <p className='message-timestamp-left'>time</p>
            </div>
          </div>
        </div>

        <div />
      </div>
      <Form>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Your message'
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant='primary'
              type='submit'
              style={{ width: '100%', backgroundColor: 'orange' }}
            >
              <i className='fas fa-paper-plane'></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default MessageForm
