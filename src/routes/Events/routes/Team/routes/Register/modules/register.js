import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_EVENT_GROUPS = 'FETCH_EVENT_GROUPS'
export const FETCH_EVENT_GROUPS_SUCCESS = 'FETCH_EVENT_GROUPS_SUCCESS'
export const FETCH_EVENT_GROUPS_FAILTURE = 'FETCH_EVENT_GROUPS_FAILTURE'

export const REGISTER_TEAM = 'REGISTER_TEAM'
export const REGISTER_TEAM_SUCCESS = 'REGISTER_TEAM_SUCCESS'
export const REGISTER_TEAM_FAILTURE = 'REGISTER_TEAM_FAILTURE'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchEventGroups = (data) => ({
  types: [FETCH_EVENT_GROUPS, FETCH_EVENT_GROUPS_SUCCESS, FETCH_EVENT_GROUPS_FAILTURE],
  promise: () => API.post(URLConf.fetchEventGroups, {
    ...data,
    method: 'fetchEventGroups'
  })
})

export const registerTeam = (data) =>({
  types: [REGISTER_TEAM, REGISTER_TEAM_SUCCESS, REGISTER_TEAM_FAILTURE],
  promise: () => API.post(URLConf.registerTeam, {...data} )
})


// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({  
  [FETCH_EVENT_GROUPS_SUCCESS]: (state, action) => ({
    ...state,
    groups: action.payload.groups,
    groupName: action.payload.groups[0] && action.payload.groups[0].name,
  }),
}, {
  groups: [],
  groupName: '精英组',
  name: '',
  coachName: '',
})

// ------------------------------------
// Selectors
// ------------------------------------

export const getGroups = (state) => state.groups
