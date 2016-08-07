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

export const RESET_PASSWORD = 'RESET_PASSWORD'
export const CHECK_ACTIVATION_CODE = 'CHECK_ACTIVATION_CODE'
export const CHECK_ACTIVATION_CODE_SUCCESS = 'CHECK_ACTIVATION_CODE_SUCCESS'
export const CHECK_ACTIVATION_CODE_FAILTURE = 'CHECK_ACTIVATION_CODE_FAILTURE'

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

//FetchMyData
export const FETCH_MY_DATA = 'FETCH_MY_DATA'
export const FETCH_MY_DATA_SUCCESS = 'FETCH_MY_DATA_SUCCESS'
export const FETCH_MY_DATA_FAILTURE = 'FETCH_MY_DATA_FAILTURE'

//updateUserInfo
export const UPDATE_USERINFO = 'UPDATE_USERINFO'

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
  return (dispatch, getState) =>
    dispatch(signUpUser(data)).then(resp => {
      setCookie(resp.payload.data.id);
    })
}

export const signInUser = (data) => ({
  types: [SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILTURE],
  promise: () => API.post(URLConf.signIn, data)
})

//export const verifyPhone = (data) => ({
//  types: [VERIFY_PHONE, VERIFY_PHONE_SUCCESS, VERIFY_PHONE_FAILTURE],
//  promise: () => API.post(URLConf.verifyPhone, data)
//})

//export const checkActivationCode = (data) => ({
//  types: [CHECK_ACTIVATION_CODE, CHECK_ACTIVATION_CODE_SUCCESS, CHECK_ACTIVATION_CODE_FAILTURE],
//  promise: () => API.post(URLConf.checkActivationCode, data)
//})

export const checkActivationCode = data => ({
  types: [CHECK_ACTIVATION_CODE, CHECK_ACTIVATION_CODE, CHECK_ACTIVATION_CODE],
  promise: () => API.post(URLConf.sendActivationCode, data)
})

export const resetPassword = data => (
{
  types: [RESET_PASSWORD, RESET_PASSWORD, RESET_PASSWORD],
  promise: () => API.post(URLConf.resetPassword, data)
});

export const fetchMyData = data => (
{
  types: [FETCH_MY_DATA, FETCH_MY_DATA_SUCCESS, VERIFY_PHONE_FAILTURE],
  promise: () => API.post(URLConf.fetchMyData, data)
});

export const verifyPhoneSuccess = createAction(VERIFY_PHONE_SUCCESS)
export const verifyPhoneFailure = createAction(VERIFY_PHONE_FAILTURE)

export const logoutUser = createAction(
  LOGOUT_USER,
  args => {
    logout()
  }
)

export const updateUserInfo = createAction(UPDATE_USERINFO)

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  user: {
    "id": "sha32dsjk23",
    "name": "my real name",
    "username": "pacific0437",
    "password": "88888888",
    "phone": "18629032103",
    "gender": "male",
    "card": "232323198611111111"
  },
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
  userNameDuplicated: false,
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
  [UPDATE_USERINFO]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      ...action.payload
    }
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
    userNameDuplicated: action.payload.userNameDuplicated
  }),
  [CHECK_USERNAME_DUPLICATED_FAILTURE]: (state, action) => ({
    ...state,
    userNameDuplicated: true
  }),
  [FETCH_MY_DATA_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: action.payload
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
