import { handleActions } from 'redux-actions'

import API from 'utils/API'

import URLConf from 'utils/url'


// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REFEREE = 'FETCH_REFEREE'
export const FETCH_REFEREE_SUCCESS = 'FETCH_REFEREE_SUCCESS'
export const FETCH_REFEREE_FAILTURE = 'FETCH_REFEREE_FAILTURE'


// ------------------------------------
// Actions
// ------------------------------------
export const fetchReferee = (data) => ({
  types: [FETCH_REFEREE, FETCH_REFEREE_SUCCESS, FETCH_REFEREE_FAILTURE],
  promise: () => API.post(URLConf.fetchReferee, {...data,
    method: 'fetchReferee'
  })
})

export default handleActions({
  [FETCH_REFEREE]: (state, action) => ({
    ...state
  }),
  [FETCH_REFEREE_SUCCESS]: (state, action) => ({
    ...state,
    groups: action.payload.groups
  }),
})
