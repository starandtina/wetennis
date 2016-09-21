import { createAction } from 'redux-actions';
import API from 'utils/API';
import URL from 'utils/url';

export const FETCH_TIME_LIST = 'FETCH_TIME_LIST';
export const FETCH_TIME_LIST_SUCCESS = 'FETCH_TIME_LIST_SUCCESS';
export const FETCH_TIME_LIST_FAILED = 'FETCH_TIME_LIST_FAILED';
export const fetchTimesList = data => ({
  types: [FETCH_TIME_LIST, FETCH_TIME_LIST_SUCCESS, FETCH_TIME_LIST_FAILED],
  promise: () => API.get(URL.fetchTimesList, data),
  meta: { isHideLoadingBar: true }
})

export const FETCH_TIME_INFO = 'FETCH_TIME_INFO';
export const FETCH_TIME_INFO_SUCCESS = 'FETCH_TIME_INFO_SUCCESS';
export const FETCH_TIME_INFO_FAILED = 'FETCH_TIME_INFO_FAILED';
export const fetchTimeInfo = data => ({
  types: [FETCH_TIME_INFO, FETCH_TIME_INFO_SUCCESS, FETCH_TIME_INFO_FAILED],
  promise: () => API.post(URL.fetchTimeInfo, data)
})

export const DELETE_TIME = 'DELETE_TIME';
export const deleteTime = createAction(DELETE_TIME)

export const ADD_TIME_MESSAGE = 'ADD_TIME_MESSAGE';
export const ADD_TIME_MESSAGE_SUCCESS = 'ADD_TIME_MESSAGE_SUCCESS';
export const ADD_TIME_MESSAGE_FAILED = 'ADD_TIME_MESSAGE_FAILED';
export const addTimeMessage = data => ({
  types: [ADD_TIME_MESSAGE, ADD_TIME_MESSAGE_SUCCESS, ADD_TIME_MESSAGE_FAILED],
  promise: () => API.post(URL.addTimeMessage, data)
})

export const ADD_TIME_MATCH = 'ADD_TIME_MATCH';
export const ADD_TIME_MATCH_SUCCESS = 'ADD_TIME_MATCH_SUCCESS';
export const ADD_TIME_MATCH_FAILED = 'ADD_TIME_MATCH_FAILED';
export const addTimeMatch = data => ({
  types: [ADD_TIME_MATCH, ADD_TIME_MATCH_SUCCESS, ADD_TIME_MATCH_FAILED],
  promise: () => API.post(URL.addTimeMatch, data)
})

export const DELETE_TIME = 'DELETE_TIME';
export const DELETE_TIME_SUCCESS = 'DELETE_TIME_SUCCESS';
export const DELETE_TIME_FAILED = 'DELETE_TIME_FAILED';
export const fetchDeleteTime = data => ({
  types: [DELETE_TIME, DELETE_TIME_SUCCESS, DELETE_TIME_FAILED],
  promise: () => API.post(URL.deleteTime, data)
})
