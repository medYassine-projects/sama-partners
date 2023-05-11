import axios from 'axios'
import * as api from '../api/index'
import { FETCH_ALL_QUIZZS } from './types'

export const getQuizzList = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuizzs()
    dispatch({ type: FETCH_ALL_QUIZZS, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}
