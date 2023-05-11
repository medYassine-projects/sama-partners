import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import './FavoriScreenStyle.css'
import { Container, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons'
import cardImage from '../images/hicking.jpg'
import FavoriDeleteModal from '../components/FavoriDeleteModal'

const animatedComponents = makeAnimated()

export const FavoriScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [categories, setCategories] = useState([])
  const [op, setOp] = useState({ value: '', label: '' })
  const [favList, setFavList] = useState([])
  const userLogin = useSelector((state) => state.userLogin)
  const userId = userLogin.userInfo.data.id
  const [favori,SetFavori]=useState([])
  const [deleteShow,setDeleteShow] = useState(false)
  const [deleteId,setDeleteId] = useState()
  const [refresh,setRefresh]=useState(false)
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails
  console.log(user?.data?.favori)
  const opt = []
  const getCategories = async () => {
    //axios.defaults.url = `http://127.0.0.1:3030`
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data.data)
    console.log(data.data)
  }

  useEffect(() => {
    getCategories()
  }, [refresh])
  const handleSelect = () => {
    const valid = []
    selectedOptions.forEach((element) => {
      valid.push(element.value)
    })

    axios.patch(`${process.env.REACT_APP_BACKURL}/user/addFavori/${userId}`, valid).then(()=>window.location.reload())
  }

  return (
    <Container className='py-3'>
      <h3 align='center' className='text-success'>
        Ajouter des catégories à vos favoris pour une meilleur expérience
      </h3>
      <Row className='py-3'>
        <Col md={4}>
          <div align='center'>
            <Select
              defaultValue={[]}
              components={animatedComponents}
              isMulti
              options={categories}
              onChange={(item) => {
                setSelectedOptions(item)

                //setFavList(...favList,item.value)
              }}
              className='select'
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}
            />

            <Button onClick={handleSelect} align='center' className='btn-info'>
              Ajouter catégorie
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <Row>
          {user?.data?.favori &&
            user?.data.favori?.map((cat, i) => {
              return (
            <Col md={6}>
              <div className='category-card-wrapper cursor-pointer'>
                <img
                  src={`${process.env.REACT_APP_BACKURL}/${cat.categoryImage.slice(
                    8,
                    cat.categoryImage.length
                  )}`}
                  className='category-image'
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <h3 className='category-txt'>{cat.name}</h3>
                <Button onClick={()=>{setDeleteShow(true);setDeleteId(cat._id);}}className='bottom-right' variant='outline'>
                  <i className='fas fa-trash'></i>
                </Button>
              </div>
            </Col>)
              })}
          </Row>
        </Col>
      </Row>
      {deleteShow ?(<FavoriDeleteModal
      favori={deleteId}
      show={deleteShow}
      onHide={() => setDeleteShow(false)}
    />):<></>}
    </Container>
  )
  return(
    <>{deleteShow ?(<FavoriDeleteModal
      favori={deleteId}
      show={deleteShow}
      onHide={() => setDeleteShow(false)}
    />):<></>}</>
  )
}
export default FavoriScreen
