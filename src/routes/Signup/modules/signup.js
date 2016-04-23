import {
  createAction,
  handleActions
} from 'redux-actions'

import {
  post
} from 'store/utils/ajaxAction'

import {
  setCookie,
  logout
} from 'utils/auth'

// Constants
// ------------------------------------
export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const signUpUser = createAction(
  SIGNUP_USER,
  args => {
    return dispatch => {
      dispatch(
        post(
          SIGNUP_USER, {
            url: '/signup',
            data: {
              ...args,
              method: 'signup'
            },
            callback(resp) {
              setCookie(resp.id)
              dispatch(signUpUserSuccess(resp))
            }
          }
        )
      )
    }
  }
)

export const signUpUserSuccess = createAction(SIGNUP_USER_SUCCESS)
export const logoutUser = createAction(
  LOGOUT_USER,
  args => {
    logout()
  }
)

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  user: null,
  initialValues: {
    // username: '1',
    // phone: '1',
    // name: '1',
    gender: 'male',
    // password: '1',
    // confirmPassword: '1'
  },
  status: null,
  error: null,
  loading: false
}

export default handleActions({
  [SIGNUP_USER]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [SIGNUP_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.payload,
      status: 'authenticated'
    }
  },
   [LOGOUT_USER]: (state, action) => {
    return {
      ...state,
      user: null,
      status: 'logout'
    }
  }
}, INITIAL_STATE)
