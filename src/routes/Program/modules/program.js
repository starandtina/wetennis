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


// ------------------------------------
// Actions
// ------------------------------------

export const fetchProgram = (data) => ({
  types: [FETCH_PROGRAM, FETCH_PROGRAM_SUCCESS, FETCH_PROGRAM_FAILTURE],
  promise: () => API.post(URLConf.fetchProgram, {...data})
})


// -----------------------------
// Reducer
// -----------------------------

export default handleActions({
  [FETCH_PROGRAM_SUCCESS]: (state, action) => ({
    ...state,
    program: action.payload
  })
}, {
  program: {
    dates: [],
    courts: {},
    matches: {},
    players: {}
  }
})
