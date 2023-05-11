/*import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,CREATE_EVENT_REQUEST,CREATE_EVENT_SUCCESS,CREATE_EVENT_FAIL } from '../actions/types'
import {
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
} from '../constants/eventConstants'

export default (events = {}, action) => {
  switch (action.type) {
    case 'FETCH_All':
      return events.payload
    case 'DELETE':
      return events.filter((event) => event._id !== action.payload)
    case CREATE_EVENT_REQUEST:
      return {loading:true} 
    case CREATE_EVENT_SUCCESS:
      return { loading: false, eventInfo: action.payload }
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return events
  }
}*/
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,CREATE_EVENT_REQUEST,CREATE_EVENT_SUCCESS,CREATE_EVENT_FAIL,UPDATE_EVENT_REQUEST,UPDATE_EVENT_SUCCESS,UPDATE_EVENT_FAIL} from '../actions/types'
import {
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
} from '../constants/eventConstants'

export default (events = [], action) => {
  switch (action.type) {
    case 'FETCH_All':
      return events.payload
    case 'DELETE':
      return events.filter((event) => event._id !== action.payload)
    case CREATE:
      return [...events, action.payload]
    default:
      return events
  }
}

export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload }
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}



export const createEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return {loading : true} 
    case CREATE_EVENT_SUCCESS:
      return { loading : false, eventInfo: action.payload.data, created: true }
    case CREATE_EVENT_FAIL:
      return { loading : false, error: action.payload }  
    default:
      return state
  }
}


export const updateEventReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return {loading : true} 
    case UPDATE_EVENT_SUCCESS:
      return { loading : false, eventInfo: action.payload.data }
    case UPDATE_EVENT_FAIL:
      return { loading : false, error: action.payload }  
    default:
      return state
  }
}