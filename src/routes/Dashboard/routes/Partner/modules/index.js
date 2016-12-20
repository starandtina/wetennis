import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_MY_FRIEND_LIST = 'FETCH_MY_FRIEND_LIST'
export const FETCH_MY_FRIEND_LIST_SUCCESS = 'FETCH_MY_FRIEND_LIST_SUCCESS'
export const FETCH_MY_FRIEND_LIST_FAILTURE = 'FETCH_MY_FRIEND_LIST_FAILTURE'

export const SET_PARTNER = 'SET_PARTNER'


// ------------------------------------
// Actions
// ------------------------------------

export const fetchMyFriendList = data => ({
  types: [FETCH_MY_FRIEND_LIST, FETCH_MY_FRIEND_LIST_SUCCESS, FETCH_MY_FRIEND_LIST_FAILTURE],
  promise: () => API.post(URLConf.fetchMyFriendList, data)
})

export const setPartner = data => ({
  type: SET_PARTNER,
  payload: data,
})

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [FETCH_MY_FRIEND_LIST_SUCCESS]: (state, action) => ({
    ...state,
    partnerList: action.payload,
  }),
  [SET_PARTNER]: (state, action) => ({
    ...state,
    partner: state.partnerList.find(p => p.id == action.payload.partnerId),
  })
}, {
  partnerList: [],
  partner: null,
})
