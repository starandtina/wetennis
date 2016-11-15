import {
  handleActions
} from 'redux-actions'

import API from 'utils/API'

import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const TEAM_REGISTER = 'TEAM_REGISTER'

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TEAM_REGISTER]: (state, action) => ({
    ...state
  }),
}, {})
