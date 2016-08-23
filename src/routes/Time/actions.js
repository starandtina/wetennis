import { createAction } from 'redux-actions';
import API from 'utils/API';
import URL from 'utils/url';

export const FETCH_TIME = 'FETCH_TIME';
export const FETCH_TIME_SUCCESS = 'FETCH_TIME_SUCCESS';
export const FETCH_TIME_FAILED = 'FETCH_TIME_FAILED';
export const fetchTime = data => ({
  types: [FETCH_TIME, FETCH_TIME_SUCCESS, FETCH_TIME_FAILED],
  promise: () => API.post(URL.fetchTime, data),
  meta: { isHideLoadingBar: true }
})

export const FETCH_TIME_INFO = 'FETCH_TIME_INFO';
export const FETCH_TIME_INFO_SUCCESS = 'FETCH_TIME_INFO_SUCCESS';
export const FETCH_TIME_INFO_FAILED = 'FETCH_TIME_INFO_FAILED';
export const fetchTimeInfo = data => ({
  types: [FETCH_TIME_INFO, FETCH_TIME_INFO_SUCCESS, FETCH_TIME_INFO_FAILED],
  promise: () => API.post(URL.fetchTimeInfo, data)
})

export const UPLOAD_TIME_IMAGE = 'UPLOAD_TIME_IMAGE';
export const UPLOAD_TIME_IMAGE_SUCCESS = 'UPLOAD_TIME_IMAGE_SUCCESS';
export const UPLOAD_TIME_IMAGE_FAILED = 'UPLOAD_TIME_IMAGE_FAILED';
export const uploadTimeImage = data => ({
  types: [UPLOAD_TIME_IMAGE, UPLOAD_TIME_IMAGE_SUCCESS, UPLOAD_TIME_IMAGE_FAILED],
  promise: () => API.post(URL.uploadImage, data)
})

export const CLEAR_TIME_IMAGE = 'CLEAR_TIME_IMAGE';
export const clearTimeImage = createAction(CLEAR_TIME_IMAGE)

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

export const FETCH_DELETE_TIME = 'FETCH_DELETE_TIME';
export const FETCH_DELETE_TIME_SUCCESS = 'FETCH_DELETE_TIME_SUCCESS';
export const FETCH_DELETE_TIME_FAILED = 'FETCH_DELETE_TIME_FAILED';
export const fetchDeleteTime = data => ({
  types: [FETCH_DELETE_TIME, FETCH_DELETE_TIME_SUCCESS, FETCH_DELETE_TIME_FAILED],
  promise: () => API.post(URL.deleteTime, data)
})