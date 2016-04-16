import { createAction, handleActions } from 'redux-actions'

// Constants
// ------------------------------------
export const SET_ACTIVE_NAV_TAB = 'SET_ACTIVE_NAV_TAB'
export const LATEST = 'LATEST'
export const EVENT = 'EVENT'
export const TIME = 'TIME'
export const GUESS = 'GUESS'
export const ME = 'ME'

// ------------------------------------
// Actions
// ------------------------------------
export const setActiveNavTab = createAction(SET_ACTIVE_NAV_TAB)

// ------------------------------------
// Reducer
// ------------------------------------
export default function activeNavTab(state = LATEST, action) {
  switch (action.type) {
  case SET_ACTIVE_NAV_TAB:
    return action.payload;
  default:
    return state;
  }
}
