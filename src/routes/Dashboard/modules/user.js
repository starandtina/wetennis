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

import API from 'utils/API'

import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------


// Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'


// Sign In User
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE'

// Verify Code
export const VERIFY_PHONE = 'VERIFY_PHONE'
export const VERIFY_PHONE_SUCCESS = 'VERIFY_PHONE_SUCCESS'
export const VERIFY_PHONE_FAILURE = 'VERIFY_PHONE_FAILURE'

// Logout User
export const LOGOUT_USER = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------

function signUpUser(data) {
  return {
    type: SIGNUP_USER,
    promise: () => API.post(URLConf.signUp, data)
  }
}

export function signUpUserThenSetCookie(data) {
  return async(dispatch, getState) => {
    const resp = await dispatch(signUpUser(data))
    setCookie(resp.payload.id)
  }
}

// export const signUpUser = createAction(
//   SIGNUP_USER,
//   args => {
//     return dispatch => {
//       dispatch(
//         post(
//           SIGNUP_USER, {
//             url: '/signup',
//             data: {
//               ...args,
//               method: 'signup'
//             },
//             callback(resp) {

//               setCookie(resp.id)
//               dispatch(signUpUserSuccess(resp))
//             }
//           }
//         )
//       )
//     }
//   }
// )

export const signUpUserSuccess = createAction(SIGNUP_USER_SUCCESS)

export const signInUser = createAction(
  SIGNIN_USER,
  args => {
    return dispatch => {
      dispatch(
        post(
          SIGNIN_USER, {
            url: '/signin',
            data: {
              ...args,
              method: 'signin'
            },
            callback(resp) {debugger
              if (resp.code !== 0) {
                dispatch(signInUserFail(resp.errorMsg));
              } else {
                setCookie(resp.id)
                dispatch(signInUserSuccess(resp))
              }
            }
          }
        )
      )
    }
  }
)

export const signInUserSuccess = createAction(SIGNIN_USER_SUCCESS)
export const signInUserFail = createAction(SIGNIN_USER_FAILURE)


export const verifyPhone = createAction(
  VERIFY_PHONE,
  args => {
    return dispatch => {
      dispatch(
        post(
          VERIFY_PHONE, {
            url: '/verifyPhone',
            data: {
              ...args,
              method: 'verifyPhone'
            },
            callback(resp) {
              if (resp.code !== 0) {
                dispatch(verifyPhoneFailure(resp.errorMsg));
              } else {
                setCookie(resp.id)
                dispatch(verifyPhoneSuccess(resp))
              }
            }
          }
        )
      )
    }
  }
)

export const verifyPhoneSuccess = createAction(VERIFY_PHONE_SUCCESS)
export const verifyPhoneFailure = createAction(VERIFY_PHONE_FAILURE)

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
  },
  [SIGNIN_USER]: (state, action) => {
    debugger
    return {
      ...state,
      user: action.payload,
      status: 'signin'
    }
  },
  [SIGNIN_USER_SUCCESS]: (state, action) => {
    debugger
    return {
      ...state,
      user: action.payload,
      status: 'authenticated'
    }
  },
  [SIGNIN_USER_FAILURE]: (state, action) => {
    debugger
    return {
      ...state,
      status: 'signin',
      error: {
        message: action.payload
      },
      user: null
    }
  }
}, INITIAL_STATE)
