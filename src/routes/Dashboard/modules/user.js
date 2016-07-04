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
export const SIGNUP_USER_FAILTURE = 'SIGNUP_USER_FAILTURE'


// Sign In User
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILTURE = 'SIGNIN_USER_FAILTURE'

// Verify Code
export const VERIFY_PHONE = 'VERIFY_PHONE'
export const VERIFY_PHONE_SUCCESS = 'VERIFY_PHONE_SUCCESS'
export const VERIFY_PHONE_FAILTURE = 'VERIFY_PHONE_FAILTURE'

export const CHECK_USERNAME_DUPLICATED = 'CHECK_USERNAME_DUPLICATED'
export const CHECK_USERNAME_DUPLICATED_SUCCESS = 'CHECK_USERNAME_DUPLICATED_SUCCESS'
export const CHECK_USERNAME_DUPLICATED_FAILTURE = 'CHECK_USERNAME_DUPLICATED_FAILTURE'

export const CHECK_PHONE_DUPLICATED = 'CHECK_PHONE_DUPLICATED'
export const CHECK_PHONE_DUPLICATED_SUCCESS = 'CHECK_PHONE_DUPLICATED_SUCCESS'
export const CHECK_PHONE_DUPLICATED_FAILTURE = 'CHECK_PHONE_DUPLICATED_FAILTURE'

// Logout User
export const LOGOUT_USER = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------

export const checkUserNameDuplicated = data => ({
  types: [CHECK_USERNAME_DUPLICATED, CHECK_USERNAME_DUPLICATED_SUCCESS, CHECK_USERNAME_DUPLICATED_FAILTURE],
  promise: () => API.post(URLConf.checkUserNameDuplicated, data)
  })

export const checkPhoneDuplicated = data => (
  {
    types: [CHECK_PHONE_DUPLICATED, CHECK_PHONE_DUPLICATED_SUCCESS, CHECK_PHONE_DUPLICATED_FAILTURE],
    promise: () => API.post(URLConf.checkPhoneDuplicated, data)
  }
);

function signUpUser(data) {
  return {
    types: [SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILTURE],
    promise: () => API.post(URLConf.signUp, data)
  }
}

export function signUpUserThenSetCookie(data) {
  return (dispatch, getState) => {
    dispatch(signUpUser(data)).then(resp => {
      setCookie(resp.payload.id)
    })
  }
}

export const signInUser = (data) => ({
  types: [SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILTURE],
  promise: () => API.post(URLConf.signIn, data)
})


export const verifyPhone = createAction(
  VERIFY_PHONE,
  args => {
    return dispatch => {
      dispatch(
        post(
          VERIFY_PHONE, {
            url: URLConf.verifyPhone,
            data: {
              ...args,
              method: 'verifyPhone'
            },
            callback(resp) {
              if (resp.code !== 0) {
                dispatch(verifyPhoneFailure(resp.errorMsg));
              } else {
                //setCookie(resp.id)
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
export const verifyPhoneFailure = createAction(VERIFY_PHONE_FAILTURE)

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
  loading: false,
  usernameDuplicated: false,
  phoneDuplicated: false
}

export default handleActions({
  [SIGNUP_USER]: (state, action) => ({
    ...state,
    user: action.payload
  }),
  [SIGNUP_USER_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
    status: 'authenticated',
    error: null
  }),
  [SIGNIN_USER_FAILTURE]: (state, action) => ({
    ...state,
    status: 'signin',
    error: {
      message: action.payload
    },
    user: null
  }),
  [LOGOUT_USER]: (state, action) => ({
    ...state,
    user: null,
    status: 'logout'
  }),
  [SIGNIN_USER]: (state, action) => ({
    ...state,
    user: action.payload,
    status: 'signin'
  }),
  [SIGNIN_USER_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
    status: 'authenticated'
  }),
  [SIGNUP_USER_FAILTURE]: (state, action) => ({
    ...state,
    status: 'signin',
    error: {
      message: action.payload
    },
    user: null
  }),
  [CHECK_USERNAME_DUPLICATED_SUCCESS]: (state, action) => ({
    ...state,
    usernameDuplicated: action.payload.usernameDuplicated
  }),
  [CHECK_USERNAME_DUPLICATED_FAILTURE]: (state, action) => ({
    ...state,
    usernameDuplicated: true
  }),
  [CHECK_PHONE_DUPLICATED_SUCCESS]: (state, action) => ({
    ...state,
    phoneDuplicated: action.payload.phoneDuplicated
  }),
  [CHECK_PHONE_DUPLICATED_FAILTURE]: (state, action) => ({
    ...state,
    phoneDuplicated: true
  })
}, INITIAL_STATE)
