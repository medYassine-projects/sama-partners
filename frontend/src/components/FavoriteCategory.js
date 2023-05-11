import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import './FavoriScreenStyle.css'
import { Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
const animatedComponents = makeAnimated()

const FavoriteCategory = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [categories, setCategories] = useState([])
  const [op, setOp] = useState({ value: '', label: '' })
  const [favList, setFavList] = useState([])
  const userLogin = useSelector((state) => state.userLogin)
  const userId = userLogin.userInfo.data.id

  const userDetails = useSelector((state) => state.userDetails)
  // const userId = userDetails.userInfo.data._id

  const opt = []
  const getCategories = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/category/categories`
    )
    setCategories(data.data)
  }

  useEffect(() => {
    getCategories()
  }, [])
  const handleSelect = () => {
    const valid = []
    selectedOptions.forEach((element) => {
      valid.push(element.value)
    })
   
    axios.put(`${process.env.REACT_APP_BACKURL}/user/addFavori/${userId}`, valid)
  }

  return (
    <Container>
      <div align='left'>
        <Select
          defaultValue={[]}
          components={animatedComponents}
          isMulti
          options={categories}
          onChange={(item) => {
            setSelectedOptions(item)
            console.log(item)
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
    </Container>
  )
}

export default FavoriteCategory
