import { LOGOUT, AUTH, LOGIN_FAIL } from '../actions/types'
/* const user = JSON.parse(localStorage.getItem("user"));
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };*/
export const auth = (state = { authData: {} }, action) => {
  //const { type, payload } = action;
  switch (action.type) {
    /*case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };*/
      case LOGOUT:
        localStorage.clear();
        return {
          ...state,
          authData:null
        };
      case AUTH:
        localStorage.setItem('profile', JSON.stringify({...action?.payload}))
        return{...state,user : action?.payload}
      default:
        return state;
    }
  }
