import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BackArrow = () => {
  const history = useHistory()

  const routeChange = () => {
    let path = `/dashboard`

    history.push(path)
  }
  return (
    <div>
      <Button className='btn-dark' onClick={routeChange}>
        <i className='fas fa-angles-left'></i> Retour
      </Button>
    </div>
  )
}

export default BackArrow
