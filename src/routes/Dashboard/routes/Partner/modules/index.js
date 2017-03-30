import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_MY_FRIEND_LIST = 'FETCH_MY_FRIEND_LIST'
export const FETCH_MY_FRIEND_LIST_SUCCESS = 'FETCH_MY_FRIEND_LIST_SUCCESS'
export const FETCH_MY_FRIEND_LIST_FAILTURE = 'FETCH_MY_FRIEND_LIST_FAILTURE'

export const SEARCH_PARTICIPANTS = 'SEARCH_PARTICIPANTS'
export const SEARCH_PARTICIPANTS_SUCCESS = 'SEARCH_PARTICIPANTS_SUCCESS'
export const SEARCH_PARTICIPANTS_FAILTURE = 'SEARCH_PARTICIPANTS_FAILTURE'

export const SET_PARTNER = 'SET_PARTNER'


// ------------------------------------
// Actions
// ------------------------------------

export const fetchMyFriendList = data => ({
  types: [FETCH_MY_FRIEND_LIST, FETCH_MY_FRIEND_LIST_SUCCESS, FETCH_MY_FRIEND_LIST_FAILTURE],
  promise: () => API.post(URLConf.fetchMyFriendList, data),
  meta: {
    isHideLoadingBar: true,
  }
})

export const searchParticipants = data => ({
  types: [SEARCH_PARTICIPANTS, SEARCH_PARTICIPANTS_SUCCESS, SEARCH_PARTICIPANTS_FAILTURE],
  promise: () => API.post(URLConf.searchParticipants, data),
  meta: {
    isHideLoadingBar: true,
  },
})

export const setPartner = data => ({
  type: SET_PARTNER,
  payload: data,
})

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [SEARCH_PARTICIPANTS_SUCCESS]: (state, action) => ({
    ...state,
    participantList: action.payload,
  }),
  [FETCH_MY_FRIEND_LIST_SUCCESS]: (state, action) => ({
    ...state,
    participantList: action.payload,
  }),
  [SET_PARTNER]: (state, action) => ({
    ...state,
    partner: state.participantList.find(p => p.id == action.payload.partnerId),
  })
}, {
  participantList: [],
  partner: undefined,
})
