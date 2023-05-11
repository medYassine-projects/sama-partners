import React from 'react'
import {useParams} from 'react-router-dom'
const AdminEventDetails = ({ match }) => {
  const { path }= useParams()
  console.log(path)
  const id = match?.params?.id.toString()
  console.log('hi',match)
  return <div>event details</div>
}

export default AdminEventDetails
