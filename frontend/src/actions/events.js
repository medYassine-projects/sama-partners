import axios from 'axios'
import * as api from '../api/index'
import {
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
} from '../constants/eventConstants'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, CREATE_EVENT_SUCCESS,CREATE_EVENT_FAIL, CREATE_EVENT_REQUEST,UPDATE_EVENT_REQUEST,UPDATE_EVENT_SUCCESS,UPDATE_EVENT_FAIL} from './types'
export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEvents()
    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteEvents = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error.message)
  }
}

export const createEvent = (event,roomName,roomUsers) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_EVENT_REQUEST,
    })
    await axios.post(`${process.env.REACT_APP_BACKURL}/event/createEvent`,event)
    .then((res)=>{
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: res })
      axios.post(`${process.env.REACT_APP_BACKURL}/api/chat/group/${roomUsers[0]}`,{name:roomName,users:roomUsers,eventId:res.data.Event._id})
      .then((resChat)=>{
        axios.patch(`${process.env.REACT_APP_BACKURL}/event/${res.data.Event._id}`,{chat:resChat.data._id})})})
    
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload:
        error?.response && error?.response?.data
          ? error.response.data
          : error.message,
    })
  }
}

export const listEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST })

    const { data } = await axios.get(`/event/${id}`)

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const updateEvent = (data, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_EVENT_REQUEST,
    })
    console.log(data) 
       const { d } = await axios.patch(
      `${process.env.REACT_APP_BACKURL}/event/${id}`,data
      
    )

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: d,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}