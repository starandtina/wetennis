import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const SEARCH_PARTICIPANTS = 'SEARCH_PARTICIPANTS'
export const SEARCH_PARTICIPANTS_SUCCESS = 'SEARCH_PARTICIPANTS_SUCCESS'
export const SEARCH_PARTICIPANTS_FAILTURE = 'SEARCH_PARTICIPANTS_FAILTURE'

export const ADD_FRIEND = 'ADD_FRIEND'
export const REMOVE_FRIEND ='REMOVE_FRIEND'

export const SAVE_FRIENDS = 'SAVE_FRIENDS'
export const SAVE_FRIENDS_SUCCESS = 'SAVE_FRIENDS_SUCCESS'
export const SAVE_FRIENDS_FAILTURE = 'SAVE_FRIENDS_FAILTURE' 

export const CLEAR_ADD_FRIEND = 'CLEAR_ADD_FRIEND'

// ------------------------------------
// Actions
// ------------------------------------

export const searchParticipants = data => ({
  types: [SEARCH_PARTICIPANTS, SEARCH_PARTICIPANTS_SUCCESS, SEARCH_PARTICIPANTS_FAILTURE],
  promise: () => API.post(URLConf.searchParticipants, data),
  meta: {
    isHideLoadingBar: true,
  },
})

export const saveFriends = data => ({
  types: [SAVE_FRIENDS, SAVE_FRIENDS_SUCCESS, SAVE_FRIENDS_FAILTURE],
  promise: () => API.post(URLConf.saveFriends, data),
})

export const addFriend = data => ({
  type: ADD_FRIEND,
  payload: data,
})

export const removeFriend = data => ({
  type: REMOVE_FRIEND,
  payload: data,
})

export const clearAddFriend = () => ({
  type: CLEAR_ADD_FRIEND,
})

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  participantList: [],
  selectedParticipants: [],
}

export default handleActions({
  [CLEAR_ADD_FRIEND]: (state, action) => ({
    ...state,
    ...initialState,
  }),
  [SEARCH_PARTICIPANTS]: (state, action) => ({
    ...state,
    ...initialState,
  }),
  [SEARCH_PARTICIPANTS_SUCCESS]: (state, action) => ({
    ...state,
    participantList: action.payload,
  }),
  [ADD_FRIEND]: (state, action) => ({
    ...state,
    selectedParticipants: [...state.selectedParticipants, action.payload],
  }),
  [REMOVE_FRIEND]: (state, action) => ({
    ...state,
    selectedParticipants: state.selectedParticipants.filter(friendId => friendId !== action.payload),
  }),
}, initialState)
