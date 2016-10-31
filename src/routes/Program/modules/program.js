import {
  handleActions
} from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_PROGRAM = 'FETCH_PROGRAM'
export const FETCH_PROGRAM_SUCCESS = 'FETCH_PROGRAM_SUCCESS'
export const FETCH_PROGRAM_FAILTURE = 'FETCH_PROGRAM_FAILTURE'

export const UPDATE_PROGRAM = 'UPDATE_PROGRAM'
export const UPDATE_PROGRAM_SUCCESS = 'UPDATE_PROGRAM_SUCCESS'
export const UPDATE_PROGRAM_FAILTURE = 'FETCH_PROGRAM_FAILTURE'

export const ADJUST_MATCH = 'ADJUST_MATCH'


// ------------------------------------
// Actions
// ------------------------------------

export const fetchProgram = (data) => ({
  types: [FETCH_PROGRAM, FETCH_PROGRAM_SUCCESS, FETCH_PROGRAM_FAILTURE],
  promise: () => API.post(URLConf.fetchProgram, {...data
  })
})

export const updateProgram = (data) => ({
  types: [UPDATE_PROGRAM, UPDATE_PROGRAM_SUCCESS, UPDATE_PROGRAM_FAILTURE],
  promise: () => API.post(URLConf.updateProgram, {...data
  })
})

export const adjustMatch = (data) => ({
  type: ADJUST_MATCH,
  payload: data
})


// -----------------------------
// Reducer
// -----------------------------

const deleteFromCourt = (court, matchId) => ({
  ...court,
  matches: court.matches.filter(key => key !== matchId)
})

const insertIntoCourt = (court, matchId, siblingMatchId) => {
  const matches = court.matches

  // If `el` is not the last element
  // If `el` is the last element
  const index = siblingMatchId ? matches.indexOf(siblingMatchId) : matches.length - 1

  return {
    ...court,
    matches: [
      ...matches.slice(0, index),
      matchId,
      ...matches.slice(index)
    ]
  }
}

export default handleActions({
  [FETCH_PROGRAM_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [ADJUST_MATCH]: (state, action) => {
    // `el = { courtId: "", matchId: ""}`
    // `sibling = { courtId: "", matchId: ""}`
    const {
      courts,
      matches
    } = state

    let {
      el,
      targetCourtId,
      sibling: {
        matchId: siblingMatchId
      },
      isFromTemporary,
      isReorder
    } = action.payload

    return {
      ...state,
      courts: Object.keys(courts)
        .reduce((memo, key) => {
          const sourceMatches = courts[key].matches
          let court = courts[key]

          // Move `el` from CourtX/temporary container to CourtY/temporary container
          // Delete from source court if it's moved from cout instead of temporary container
          if (el.courtId === key && !isFromTemporary && !isReorder) {
            court = deleteFromCourt(courts[el.courtId], el.matchId)
          }
          // Insert into target court
          else if (targetCourtId && targetCourtId === key) {
            court = insertIntoCourt(courts[targetCourtId], el.matchId, siblingMatchId)
          }

          memo[key] = court

          return memo
        }, {})
    }
  }
}, {
  courts: {},
  matches: {},
  players: {}
})

export const getUnScheduledMatchIds = ({ courts, matches, players }) => {
  // Collect all of scheduled matches
  const scheduledMatchIds = Object.keys(courts).reduce((memo, courtId) => {
    return [...memo, ...courts[courtId].matches]
  }, [])

  return Object.keys(matches).filter( key => scheduledMatchIds.indexOf(key) === -1)
}
