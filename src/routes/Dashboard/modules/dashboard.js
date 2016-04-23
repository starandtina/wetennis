import {
  createAction,
  handleActions
} from 'redux-actions'

// Constants
// ------------------------------------
export const LOGOUT_USER = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------



export const logoutUser = createAction(LOGOUT_USER)

// ------------------------------------
// Reducer
// ------------------------------------

const INITIAL_STATE = {
  user: null,
  status: null,
  error: null,
  loading: false
}

export default handleActions({
  [LOGOUT_USER]: (state, action) => {
    return {
      ...state,
      user: null,
      status: 'logout'
    }
  }
}, INITIAL_STATE)
