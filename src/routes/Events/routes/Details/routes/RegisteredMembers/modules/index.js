import { handleActions } from 'redux-actions'
import API from 'utils/API'
import URLConf from 'utils/url'


// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_REGISTERED_MEMBERS = `FETCH_REGISTERED_MEMBERS`
export const FETCH_REGISTERED_MEMBERS_SUCCESS = `FETCH_REGISTERED_MEMBERS_SUCCESS`
export const FETCH_REGISTERED_MEMBERS_FAILTURE = `FETCH_REGISTERED_MEMBERS_FAILTURE`

// ------------------------------------
// Actions
// ------------------------------------
export const fetchRegisteredMembers = eventId => ({
  types: [FETCH_REGISTERED_MEMBERS, FETCH_REGISTERED_MEMBERS_SUCCESS, FETCH_REGISTERED_MEMBERS_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredMembers, { eventId }),
})


// ------------------------------------
// Reducers
// ------------------------------------

export default handleActions({
  [FETCH_REGISTERED_MEMBERS_SUCCESS]: (state, action) => ({
    ...state,
    registeredMembers: action.payload,
  })
}, { registeredMembers: [] })
