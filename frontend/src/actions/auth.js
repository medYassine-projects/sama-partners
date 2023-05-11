import { AUTH } from './types'
import * as api from '../api/index.js'
import { LOGOUT, LOGIN_FAIL } from './types'

export const signin = (formData,router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    await dispatch({ type: AUTH, payload :data });
    //router.push('/')
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      error: error,
    })
    console.log(error)
  }
}

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

    dispatch({ type: AUTH, data })

    //router.push('/');
    
  } catch (error) {
    console.log(error)
  }
}

export const logout = (router) => async (dispatch) => {
  dispatch({ type: LOGOUT })
  router.push('/')
  window.location.reload()
}
