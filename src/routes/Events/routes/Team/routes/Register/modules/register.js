import {
  handleActions
} from 'redux-actions'

import API from 'utils/API'

import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const TEAM_REGISTER = 'TEAM_REGISTER'

export const START_ADD_TEAM_MEMBER = 'START_ADD_TEAM_MEMBER'
export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER'

// ------------------------------------
// Actions
// ------------------------------------

export const startAddTeamMember = () => ({
  type: START_ADD_TEAM_MEMBER
})

export const addTeamMember = (data) => ({
  type: ADD_TEAM_MEMBER,
  payload: data
})

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TEAM_REGISTER]: (state, action) => ({
    ...state,
    adding: false
  }),
  [START_ADD_TEAM_MEMBER]: (state, action) => ({
    ...state,
    adding: true
  }),
  [ADD_TEAM_MEMBER]: (state, action) => ({
    ...state,
    members: state.members.concat(action.payload),
    adding: false
  })
}, {
  groupName: '精英组',
  name: '',
  coachName: '',
  members: [{
    name: 'testing',
    gender: 'male',
    identifyCard: 'identifyCard',
    isBench: true
  }]
})
