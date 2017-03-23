import { handleActions } from 'redux-actions'
import API from 'utils/API'
import URLConf from 'utils/url'


// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_REGISTERED_TEAMS = `FETCH_REGISTERED_TEAMS`
export const FETCH_REGISTERED_TEAMS_SUCCESS = `FETCH_REGISTERED_TEAMS_SUCCESS`
export const FETCH_REGISTERED_TEAMS_FAILTURE = `FETCH_REGISTERED_TEAMS_FAILTURE`

// ------------------------------------
// Actions
// ------------------------------------
export const fetchRegisteredTeams = eventId => ({
  types: [FETCH_REGISTERED_TEAMS, FETCH_REGISTERED_TEAMS_SUCCESS, FETCH_REGISTERED_TEAMS_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredTeams, { eventId }),
})


// ------------------------------------
// Reducers
// ------------------------------------

export default handleActions({
  [FETCH_REGISTERED_TEAMS_SUCCESS]: (state, action) => ({
    ...state,
    registeredTeams: action.payload,
  })
}, { registeredTeams: [] })
