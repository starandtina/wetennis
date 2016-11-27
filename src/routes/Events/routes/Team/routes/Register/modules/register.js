import { handleActions } from 'redux-actions'
import { submit } from 'redux-form'

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

export const registerTeam = (data) => ({
  types: [REGISTER_TEAM, REGISTER_TEAM_SUCCESS, REGISTER_TEAM_FAILTURE],
  promise: () => API.post(URLConf.registerTeam, {
    ...data,
    members: Object.keys(data.members).map(id => ({
      ...data.members[id],
      id
    }))
  }),
  payload: data,
})

export const submitTeamRegisterForm = (form) => 
  (dispatch, state) => {
    dispatch(submit(form))
}


// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [REGISTER_TEAM]: (state, action) => ({
    ...state,
    ...action.payload,
    group: state.groups.find(group => group.id === action.payload.groupId),
  }),
  [REGISTER_TEAM_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [FETCH_EVENT_GROUPS_SUCCESS]: (state, action) => ({
    ...state,
    groups: action.payload.groups,
    groupId: action.payload.groups[0] && action.payload.groups[0].id,
  }),
}, {
  groups: []
})

// ------------------------------------
// Selectors
// ------------------------------------

export const getGroups = (state) => state.groups

export const getTeamRegisterFormInitialValues = (state) => ({
  groupId: state.groupId,
  name: state.name,
  coachName: state.coachName,
})
