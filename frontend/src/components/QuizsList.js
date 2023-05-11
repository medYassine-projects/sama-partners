import React,{useState} from 'react'
import Loader from './Loader'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AdminQuizDeleteModal from './AdminQuizDeleteModal'

const QuizsList = ({ quizs }) => {
  const [deleteShow,setDeleteShow] = useState(false);
  const [deleteId,setDeleteId]=useState()
  const tableRows = quizs.map((quiz) => {
    return (
      <tr key={quiz._id}>
        <td>{quiz.name}</td>

        <td>
          <Button className='btn-warning'
          onClick={()=>{setDeleteShow(true);setDeleteId(quiz._id)}}>
            <i className='fas fa-trash'></i>
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <>
    {deleteShow ? (<AdminQuizDeleteModal
      quiz={deleteId}
      show={deleteShow}
      onHide={() => setDeleteShow(false)}
    />) :<></>}
    <Table striped size='sm' responsive='sm'>
      <thead>
        <tr>
          <th>Titre d'événement</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table></>
  )
}

export default QuizsList
