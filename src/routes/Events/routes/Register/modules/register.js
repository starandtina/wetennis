import {
  createAction,
  handleActions
} from 'redux-actions'

import {
  post
} from 'store/utils/ajaxAction'

import API from 'utils/API'

import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_EVENT_GROUPS = 'FETCH_EVENT_GROUPS'
export const FETCH_EVENT_GROUPS_SUCCESS = 'FETCH_EVENT_GROUPS_SUCCESS'
export const FETCH_EVENT_GROUPS_FAILTURE = 'FETCH_EVENT_GROUPS_FAILTURE'


export const FETCH_REGISTERED_USERS = 'FETCH_REGISTERED_USERS'
export const FETCH_REGISTERED_USERS_SUCCESS = 'FETCH_REGISTERED_USERS_SUCCESS'
export const FETCH_REGISTERED_USERS_FAILTURE = 'FETCH_REGISTERED_USERS_FAILTURE'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'


// ------------------------------------
// Actions
// ------------------------------------
export const fetchEventGroups = (data) => ({
  types: [FETCH_EVENT_GROUPS, FETCH_EVENT_GROUPS_SUCCESS, FETCH_EVENT_GROUPS_FAILTURE],
  promise: () => API.post(URLConf.fetchEventGroups, {...data,
    method: 'fetchEventGroups'
  })
})

export const fetchRegisteredUsers = (data) => ({
  types: [FETCH_REGISTERED_USERS, FETCH_REGISTERED_USERS_SUCCESS, FETCH_REGISTERED_USERS_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredUsers, data)
})

export const selectCategory = createAction(SELECT_CATEGORY)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_EVENT_GROUPS]: (state, action) => ({
    ...state
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
  })
}, { groups: [], registeredUsers: [], group: { name: '级别', items: []  }, item: { name: '项目' }})
