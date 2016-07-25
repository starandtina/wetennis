import {
  createAction,
  handleActions
} from 'redux-actions'

import {
  post
} from 'store/utils/ajaxAction'

import {
  setCookie,
  logout
} from 'utils/auth'

import API from 'utils/API'

import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------


// FETCH_MY_SETTINGS
export const FETCH_MY_SETTINGS = 'FETCH_MY_SETTINGS'
export const FETCH_MY_SETTINGS_SUCCESS = 'FETCH_MY_SETTINGS_SUCCESS'


//update my settings

export const UPDATE_MY_SETTINGS = 'UPDATE_MY_SETTINGS'
export const UPDATE_MY_SETTINGS_SUCCESS = 'UPDATE_MY_SETTINGS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchMySettings = data => ({
  types: [FETCH_MY_SETTINGS, FETCH_MY_SETTINGS_SUCCESS, FETCH_MY_SETTINGS],
  promise: () => API.post(URLConf.fetchMySettings, data)
  });

export const updateMySettings = data => (
{
  types: [UPDATE_MY_SETTINGS, UPDATE_MY_SETTINGS_SUCCESS, UPDATE_MY_SETTINGS],
  promise: () => API.post(URLConf.updateMySettings, data)
});

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  settings: null
}

export default handleActions({
  [FETCH_MY_SETTINGS]: (settings, action) => ({
    settings: action.payload
  }),
  [FETCH_MY_SETTINGS_SUCCESS]: (settings, action) => ({
    settings: action.payload
  })
}, INITIAL_STATE)
