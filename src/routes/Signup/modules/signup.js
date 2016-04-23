import {
  createAction,
  handleActions
} from 'redux-actions'

import {
  post
} from 'store/utils/ajaxAction'

import { setCookie } from 'utils/auth'

// Constants
// ------------------------------------
export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'

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
              'method': 'signup'
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
  [SIGNUP_USER]: (state, action) => {
    return action.payload;
  },
  [SIGNUP_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.payload,
      status: 'authenticated'
    }
  }
}, INITIAL_STATE)
