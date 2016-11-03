import {
  createAction,
  handleActions
} from 'redux-actions'

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
export const RESET_SIGNUP_USER = 'RESET_SIGNUP_USER'

// Sign In User
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILTURE = 'SIGNIN_USER_FAILTURE'
export const RESET_SIGNIN_USER = 'RESET_SIGNIN_USER'

export const RESET_PASSWORD = 'RESET_PASSWORD'
export const SEND_ACTIVATION_CODE =  'SEND_ACTIVATION_CODE'
export const SEND_ACTIVATION_CODE_SUCCESS =  'SEND_ACTIVATION_CODE_SUCCESS'
export const SEND_ACTIVATION_CODE_FAILTURE =  'SEND_ACTIVATION_CODE_FAILTURE'

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

// fetch UserInfo
export const FETCH_USERINFO = 'FETCH_USERINFO'
export const FETCH_USERINFO_SUCCESS = 'FETCH_USERINFO_SUCCESS'
export const FETCH_USERINFO_FAILTURE = 'FETCH_USERINFO_FAILTURE'

export const UPLOAD_EQUIPMENT_IMAGE = 'UPLOAD_EQUIPMENT_IMAGE'
export const UPLOAD_EQUIPMENT_IMAGE_SUCCESS = 'UPLOAD_EQUIPMENT_IMAGE_SUCCESS'

export const ADD_EQUIPMENT = 'ADD_EQUIPMENT'
export const ADD_EQUIPMENT_SUCCESS = 'ADD_EQUIPMENT_SUCCESS'

export const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT'
export const UPDATE_EQUIPMENT_SUCCESS = 'UPDATE_EQUIPMENT_SUCCESS'

export const DELETE_EQUIPMENT = 'DELETE_EQUIPMENT'
export const DELETE_EQUIPMENT_SUCCESS = 'DELETE_EQUIPMENT_SUCCESS'

export const UPDATE_BG_IMAGE = 'UPDATE_BG_IMAGE'
export const UPDATE_BG_IMAGE_SUCCESS = 'UPDATE_BG_IMAGE_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const checkUserNameDuplicated = data => ({
  types: [CHECK_USERNAME_DUPLICATED, CHECK_USERNAME_DUPLICATED_SUCCESS, CHECK_USERNAME_DUPLICATED_FAILTURE],
  promise: () => API.post(URLConf.checkUserNameDuplicated, data),
  meta: { isHideLoadingBar: true }
  })

export const checkPhoneDuplicated = data => (
  {
    types: [CHECK_PHONE_DUPLICATED, CHECK_PHONE_DUPLICATED_SUCCESS, CHECK_PHONE_DUPLICATED_FAILTURE],
    promise: () => API.post(URLConf.checkPhoneDuplicated, data),
    meta: { isHideLoadingBar: true }
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

export const resetSignupUser = (data) => ({
  type: RESET_SIGNUP_USER
})

export const signInUser = (data) => ({
  types: [SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILTURE],
  promise: () => API.post(URLConf.signIn, data)
})

export const resetSigninUser = (data) => ({
  type: RESET_SIGNIN_USER
})

export const sendActivationCode = data => ({
  types: [SEND_ACTIVATION_CODE, SEND_ACTIVATION_CODE, SEND_ACTIVATION_CODE],
  promise: () => API.post(URLConf.sendActivationCode, data)
})

export const resetPassword = data => (
{
  types: [RESET_PASSWORD, RESET_PASSWORD, RESET_PASSWORD],
  promise: () => API.post(URLConf.resetPassword, data)
});

export const fetchMyData = data => (
{
  types: [FETCH_MY_DATA, FETCH_MY_DATA_SUCCESS, FETCH_MY_DATA_FAILTURE],
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

export const updateUserInfo = createAction(UPDATE_USERINFO);

export const fetchUserInfo = data => (
{
  types: [FETCH_USERINFO, FETCH_USERINFO_SUCCESS, FETCH_USERINFO_FAILTURE],
  promise: () => API.post(URLConf.fetchUserInfo, data)
});

export const addEquipment = data => (
{
  types: [ADD_EQUIPMENT, ADD_EQUIPMENT_SUCCESS, ADD_EQUIPMENT],
  promise: () => API.post(URLConf.addEquipment, data)
});

export const updateEquipment = data => (
{
  types: [UPDATE_EQUIPMENT, UPDATE_EQUIPMENT_SUCCESS, UPDATE_EQUIPMENT],
  promise: () => API.post(URLConf.updateEquipment, data)
});

export const updateBGImage = data => (
{
  types: [UPDATE_BG_IMAGE, UPDATE_BG_IMAGE_SUCCESS, UPDATE_BG_IMAGE],
  promise: () => API.post(URLConf.updateBGImage, data),
  meta: data
});

export const deleteEquipment = data => (
{
  types: [DELETE_EQUIPMENT, DELETE_EQUIPMENT_SUCCESS, DELETE_EQUIPMENT],
  promise: () => API.post(URLConf.deleteEquipment, data)
});

export const uploadEquipmentImage = data => ({
  types: [UPLOAD_EQUIPMENT_IMAGE, UPLOAD_EQUIPMENT_IMAGE_SUCCESS, UPLOAD_EQUIPMENT_IMAGE_SUCCESS],
  promise: () => API.post(URLConf.uploadEquipmentImage, data)
})

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  user: {
    //"id": "sha32dsjk23",
    //"name": "my real name",
    //"username": "pacific0437",
    //"password": "88888888",
    //"phone": "18629032103",
    //"gender": "male",
    //"cardId": "232323198611111111"
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
  [FETCH_USERINFO_SUCCESS]: (state, action) => ({
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
  [RESET_SIGNIN_USER]: (state, action) => ({
    ...state,
    status: null,
    error: null
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
  [RESET_SIGNUP_USER]: (state, action) => ({
    ...state,
    status: null,
    error: null,
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
  [ADD_EQUIPMENT_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: {
      ...state.userInfo,
      equipment:action.payload
    }
  }),
  [UPDATE_EQUIPMENT_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: {
      ...state.userInfo,
      equipment:action.payload
    }
  }),
  [UPDATE_BG_IMAGE_SUCCESS]: (state, { meta }) => ({
    ...state,
    userInfo: {
      ...state.userInfo,
      backGroundImageUrl: meta.ImageUrl
    }
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
