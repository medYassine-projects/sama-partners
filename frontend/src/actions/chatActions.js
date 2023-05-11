import axios from 'axios'
import {
  CHAT_GET_REQUEST,
  CHAT_GET_SUCCESS,
  CHAT_GET_FAIL,
} from '../constants/chatConstants'

export const getChatMessages = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHAT_GET_REQUEST,
    })

    const { data } = await axios.get(`${process.env.REACT_APP_BACKURL}/api/chat/${id}`)

    dispatch({
      type: CHAT_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
