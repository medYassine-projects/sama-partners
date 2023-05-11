import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
import * as api from '../api/index.js'
export const addToCart = (id, plc, participants) => async (dispatch, getState) => {
  const { data } = await axios.get(`${process.env.REACT_APP_BACKURL}/event/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      event: data._id,
      name: data.title,
      image: data.eventImage,
      price: data.price,
      numberOfPlacesLeft: data.numberOfPlacesLeft,
      plc,
      participants,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const payAction = (amount) => async (dispatch) => {
  const p = await api.payRequest(amount)
}
