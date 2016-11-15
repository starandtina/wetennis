import {
  handleActions
} from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const TEAM = 'TEAM'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TEAM]: (state, action) => ({
    ...state
  }),
}, {})
