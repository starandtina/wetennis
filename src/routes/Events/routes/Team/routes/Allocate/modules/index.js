import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_REGISTERED_TEAM_SEQUENCE = 'FETCH_REGISTERED_TEAM_SEQUENCE'
export const FETCH_REGISTERED_TEAM_SEQUENCE_SUCCESS = 'FETCH_REGISTERED_TEAM_SEQUENCE_SUCCESS'
export const FETCH_REGISTERED_TEAM_SEQUENCE_FAILTURE= 'FETCH_REGISTERED_TEAM_SEQUENCE_FAILTURE'

export const UPDATE_REGISTERED_TEAM_SEQUENCE = 'UPDATE_REGISTERED_TEAM_SEQUENCE'
export const UPDATE_REGISTERED_TEAM_SEQUENCE_SUCCESS = 'UPDATE_REGISTERED_TEAM_SEQUENCE_SUCCESS'
export const UPDATE_REGISTERED_TEAM_SEQUENCE_FAILTURE= 'UPDATE_REGISTERED_TEAM_SEQUENCE_FAILTURE'

export const FETCH_REGISTERED_TEAM_MEMBERS = 'FETCH_REGISTERED_TEAM_MEMBERS'
export const FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS = 'FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS'
export const FETCH_REGISTERED_TEAM_MEMBERS_FAILTURE = 'FETCH_REGISTERED_TEAM_MEMBERS_FAILTURE'

export const MOVE_TEAM_MEMBER = 'MOVE_TEAM_MEMBER'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchRegisteredTeamSequence = (data) => ({
  types: [FETCH_REGISTERED_TEAM_SEQUENCE, FETCH_REGISTERED_TEAM_SEQUENCE_SUCCESS, FETCH_REGISTERED_TEAM_SEQUENCE_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredTeamSequence, {...data}),
})

export const fetchRegisteredTeamMembers = (data) => ({
  types: [FETCH_REGISTERED_TEAM_MEMBERS, FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS, FETCH_REGISTERED_TEAM_MEMBERS_FAILTURE],
  promise: () => API.post(URLConf.fetchRegisteredTeamMembers, {...data}),
})

export const updateRegisteredTeamSequence = (data) => ({
  types: [UPDATE_REGISTERED_TEAM_SEQUENCE, UPDATE_REGISTERED_TEAM_SEQUENCE_SUCCESS, UPDATE_REGISTERED_TEAM_SEQUENCE_FAILTURE],
  promise: () => API.post(URLConf.updateRegisteredTeamSequence, {...data}),
})

export const moveTeamMember = (data) => ({
  type: MOVE_TEAM_MEMBER,
  payload: data,
})

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [FETCH_REGISTERED_TEAM_MEMBERS_SUCCESS]: (state, action) => ({
    ...state,
    registeredTeamMembers: action.payload,
  }),
  [UPDATE_REGISTERED_TEAM_SEQUENCE_SUCCESS]: (state, action) => ({
    ...state,
  }),
  [FETCH_REGISTERED_TEAM_SEQUENCE_SUCCESS]: (state, action) => ({
    ...state,
    registeredTeamSequence: action.payload,
  }),
  [MOVE_TEAM_MEMBER]: (state, action) => {
    const { teamMemberId, targetTeamSequenceId, sourceTeamSequenceId } = action.payload
    let finalState = state

    // Add team member
    if (targetTeamSequenceId && teamMemberId) {
      finalState = {
        ...finalState,
        registeredTeamSequence: finalState.registeredTeamSequence.map(s => {
          if (targetTeamSequenceId === s.id) {
            return {
              ...s,
              teamMembers: s.teamMembers.concat(teamMemberId)
            }
          }

          return s
        })
      }
    }

     // Remove team member
    if (sourceTeamSequenceId && teamMemberId) {
      finalState = {
        ...finalState,
        registeredTeamSequence: finalState.registeredTeamSequence.map(s => {
          if (sourceTeamSequenceId === s.id) {
            return {
              ...s,
              teamMembers: s.teamMembers.filter(key => key !== teamMemberId)
            }
          }

          return s
        })
      }
    }

    return {
      ...finalState
    }
  },
}, {
  registeredTeamSequence: [{
    "id": "sequence1",
    "name": "第一双打",
    "teamMembers": ["1", "2"],
    "restrictions": {

    }
  }, {
    "id": "sequence2",
    "name": "第二双打",
    "teamMembers": ["3"],
    "restrictions": {

    }
  }, {
    "id": "sequence3",
    "name": "混合双打",
    "teamMembers": [],
    "restrictions": {

    }
  }],
  registeredTeamMembers: {
    "1": {
      "id": "1",
      "name": "fucking yourself",
      "gender": "male",
      "identifyCard": "500230199010110010",
      "isBench": false
    },
    "2": {
      "id": "2",
      "name": "testing2",
      "gender": "female",
      "identifyCard": "500230199010110010",
      "isBench": false
    },
    "3": {
      "id": "3",
      "name": "testing3",
      "gender": "male",
      "passport": "passport",
      "isBench": true
    }
  }
})

// ------------------------------------
// Reducer
// ------------------------------------

export const getUnScheduledTeamMemberIds = ({ registeredTeamMembers,  registeredTeamSequence }) => {
  // Collect all of scheduled matches
  const scheduledTeamMemberIds = registeredTeamSequence.reduce((memo, teamSequence) => {
    return [...memo, ...teamSequence.teamMembers]
  }, [])

  return Object.keys(registeredTeamMembers).filter(key => scheduledTeamMemberIds.indexOf(key) === -1)
}
