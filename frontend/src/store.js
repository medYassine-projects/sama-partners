import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
//import rootReducer from './reducers'
import { eventDetailsReducer, createEventReducer,updateEventReducer } from './reducers/events'
import { cartReducer } from './reducers/cartReducers'
import { auth } from './reducers/auth'
import { quizzReducer } from './reducers/quizzReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import { getChatReducer } from './reducers/chatReducer'

const reducer = combineReducers({
  auth: auth,
  eventDetails: eventDetailsReducer,
  updateEvent: updateEventReducer,
  cart: cartReducer,
  quizzList: quizzReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createEvent:createEventReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  getChat: getChatReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
