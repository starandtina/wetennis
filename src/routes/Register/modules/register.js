import {
  createAction,
  handleActions
} from 'redux-actions'

import {
  post
} from 'store/utils/ajaxAction'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUPS = 'FETCH_GROUPS'
export const FETCH_REGISTERED_USERS = 'FETCH_REGISTERED_USERS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'


// ------------------------------------
// Actions
// ------------------------------------
export const fetchGroups = createAction(
  FETCH_GROUPS,
  args => {
    return dispatch => {
      dispatch(
        post(
          FETCH_GROUPS, {
            url: '/eventCategories',
            data: {
              ...args,
              method: 'fetchEventCategories'
            }
          }
        )
      )
    }
  }
)

export const fetchRegisteredUsers = createAction(
  FETCH_REGISTERED_USERS,
  args => {
    return dispatch => {
      dispatch(
        post(
          FETCH_REGISTERED_USERS, {
            url: '/registeredUsers',
            data: {
              ...args,
              method: 'fetchRegisteredUsers'
            }
          }
        )
      )
    }
  }
)

export const selectCategory = createAction(SELECT_CATEGORY)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_GROUPS]: (state, action) => {
    return {
      ...state,
      groups: action.payload.groups,
      items: action.payload.items
    }
  },
  [FETCH_REGISTERED_USERS]: (state, action) => {
    return {
      ...state,
      registeredUsers: action.payload
    }
  },
  [SELECT_CATEGORY]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}, { groups: [], items: [], registeredUsers: [], group: {}, item: {}})
