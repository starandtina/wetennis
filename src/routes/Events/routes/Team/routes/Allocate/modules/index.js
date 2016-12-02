import {
  handleActions
} from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_REGISTERED_TEAM_MEMBERS = 'FETCH_REGISTERED_TEAM_MEMBERS'
export const FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS = 'FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS'
export const FETCH_REGISTERED_TEAM_MEMBERS_FAILTURE = 'FETCH_REGISTERED_TEAM_MEMBERS_FAILTURE'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchRegisteredTeamMembers = (data) => ({
  types: [FETCH_REGISTERED_TEAM_MEMBERS, FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS, FETCH_REGISTERED_TEAM_MEMBERS_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredTeamMembers, {...data
  }),
})

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS]: (state, action) => ({
    ...state,
    registeredTeamMembers: action.payload,
  })
}, {
  registeredTeamMembers: [{
    "id": "1",
    "name": "testing1",
    "gender": "male",
    "identifyCard": "500230199010110010",
    "isBench": false
  }, {
    "id": "2",
    "name": "testing2",
    "gender": "female",
    "identifyCard": "500230199010110010",
    "isBench": false
  }, {
    "id": "3",
    "name": "testing3",
    "gender": "male",
    "passport": "passport",
    "isBench": true
  }]
})
