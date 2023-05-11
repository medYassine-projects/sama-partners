import {
  CHAT_GET_REQUEST,
  CHAT_GET_SUCCESS,
  CHAT_GET_FAIL,
} from '../constants/chatConstants'

export const getChatReducer = (state = { chats: {} }, action) => {
  switch (action.type) {
    case CHAT_GET_REQUEST:
      return { ...state, loading: true }
    case CHAT_GET_SUCCESS:
      return { loading: false, chats: action.payload }
    case CHAT_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
