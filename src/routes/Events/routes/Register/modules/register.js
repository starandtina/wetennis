import {
  createAction,
  handleActions
} from 'redux-actions'

import API from 'utils/API'

import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_EVENT_GROUPS = 'FETCH_EVENT_GROUPS'
export const FETCH_EVENT_GROUPS_SUCCESS = 'FETCH_EVENT_GROUPS_SUCCESS'
export const FETCH_EVENT_GROUPS_FAILTURE = 'FETCH_EVENT_GROUPS_FAILTURE'

export const REGISTER_EVENT = 'REGISTER_EVENT'
export const REGISTER_EVENT_SUCCESS = 'REGISTER_EVENT_SUCCESS'
export const REGISTER_EVENT_FAILTURE = 'REGISTER_EVENT_FAILTURE'

export const FETCH_REGISTERED_USERS = 'FETCH_REGISTERED_USERS'
export const FETCH_REGISTERED_USERS_SUCCESS = 'FETCH_REGISTERED_USERS_SUCCESS'
export const FETCH_REGISTERED_USERS_FAILTURE = 'FETCH_REGISTERED_USERS_FAILTURE'

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const UPLOAD_USER_INFO = 'UPLOAD_USER_INFO';

export const FETCH_PARTNER_LIST = 'FETCH_PARTNER_LIST'
export const FETCH_PARTNER_LIST_SUCCESS = 'FETCH_PARTNER_LIST_SUCCESS'
export const FETCH_PARTNER_LIST_FAILTURE = 'FETCH_PARTNER_LIST_FAILTURE'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchEventGroups = data => ({
  types: [FETCH_EVENT_GROUPS, FETCH_EVENT_GROUPS_SUCCESS, FETCH_EVENT_GROUPS_FAILTURE],
  promise: () => API.post(URLConf.fetchEventGroups, data)
})

export const fetchPartnerList = data => ({
  types: [FETCH_PARTNER_LIST, FETCH_REGISTERED_USERS_SUCCESS, FETCH_REGISTERED_USERS_FAILTURE],
  promise: () => API.post(URLConf.fetchPartnerList, data)
})

export const fetchRegisteredUsers = data => ({
  types: [FETCH_REGISTERED_USERS, FETCH_REGISTERED_USERS_SUCCESS, FETCH_REGISTERED_USERS_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredUsers, data)
})

export const registerEvent = data => ({
  types: [REGISTER_EVENT, REGISTER_EVENT_SUCCESS, REGISTER_EVENT_FAILTURE],
  promise: () => API.post(URLConf.registerEvent, data)
})

export const selectCategory = createAction(SELECT_CATEGORY)
export const uploadUserInfo = createAction(UPLOAD_USER_INFO)

// ------------------------------------
// Reducer
// ------------------------------------
const initializeState = {
  groups: [],
  registeredUsers: [],
  group: { name: '级别', items: []  },
  item: { name: '项目' },
}

export default handleActions({
  [FETCH_EVENT_GROUPS]: (state, action) => ({
    ...state,
    // ...initializeState,
  }),
  [FETCH_EVENT_GROUPS_SUCCESS]: (state, action) => ({
    ...state,
    groups: action.payload.groups
  }),
  [FETCH_REGISTERED_USERS_SUCCESS]: (state, action) => ({
    ...state,
    registeredUsers: action.payload
  }),
  [SELECT_CATEGORY]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [UPLOAD_USER_INFO]: (state, action) => ({
    ...state,
    user: action.payload,
  })
}, initializeState)
