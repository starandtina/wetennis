import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_FOLLOWED_PARTNER_LIST = 'FETCH_FOLLOWED_PARTNER_LIST'
export const FETCH_FOLLOWED_PARTNER_LIST_SUCCESS = 'FETCH_FOLLOWED_PARTNER_LIST_SUCCESS'
export const FETCH_FOLLOWED_PARTNER_LIST_FAILTURE = 'FETCH_FOLLOWED_PARTNER_LIST_FAILTURE'

export const ADD_PARTNER = 'ADD_PARTNER'
export const ADD_PARTNER_SUCCESS = 'ADD_PARTNER_SUCCESS'
export const ADD_PARTNER_FAILTURE = 'ADD_PARTNER_FAILTURE'


// ------------------------------------
// Actions
// ------------------------------------

export const fetchFollowedPartnerList = (data) => ({
  types: [FETCH_FOLLOWED_PARTNER_LIST, FETCH_FOLLOWED_PARTNER_LIST_SUCCESS, FETCH_FOLLOWED_PARTNER_LIST_FAILTURE],
  promise: () => API.post(URLConf.fetchFollowedPartnerList, data)
})

export const addPartner = (data) => ({
  types: [ADD_PARTNER, ADD_PARTNER_SUCCESS, ADD_PARTNER_FAILTURE],
  promise: () => API.post(URLConf.addPartner, data)
})

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [FETCH_FOLLOWED_PARTNER_LIST_SUCCESS]: (state, action) => ({
    ...state,
    partnerList: action.payload,
  }),
  [ADD_PARTNER_SUCCESS]: (state, action) => ({
    ...state,
    partnerList: state.partnerList.concat(action.payload),
  })
}, {
  partnerList: [],
})
