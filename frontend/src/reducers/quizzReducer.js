import { FETCH_ALL_QUIZZS } from '../actions/types'

export const quizzReducer = (state = { quizz: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_QUIZZS:
      return { ...state, quizz: action.payload }

    default:
      return state
  }
}
