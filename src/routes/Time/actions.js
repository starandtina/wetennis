import { createAction } from 'redux-actions';
import API from 'utils/API';
import URL from 'utils/url';

export const FETCH_TIME_LIST = 'FETCH_TIME_LIST';
export const FETCH_TIME_LIST_SUCCESS = 'FETCH_TIME_LIST_SUCCESS';
export const FETCH_TIME_LIST_FAILED = 'FETCH_TIME_LIST_FAILED';
export const fetchTimesList = ({currentPage, id, needLoading}) => {
  return ({
  types: [FETCH_TIME_LIST, FETCH_TIME_LIST_SUCCESS, FETCH_TIME_LIST_FAILED],
  promise: () => API.get(`${URL.times}?currentPage=${currentPage}&id=${id}`),
  meta: { isHideLoadingBar: !needLoading }
})}

export const FETCH_TIME_INFO = 'FETCH_TIME_INFO';
export const FETCH_TIME_INFO_SUCCESS = 'FETCH_TIME_INFO_SUCCESS';
export const FETCH_TIME_INFO_FAILED = 'FETCH_TIME_INFO_FAILED';
export const fetchTimeInfo = data => ({
  types: [FETCH_TIME_INFO, FETCH_TIME_INFO_SUCCESS, FETCH_TIME_INFO_FAILED],
  promise: () => API.post(URL.fetchTimeInfo, data)
})


export const ADD_TIME_MESSAGE = 'ADD_TIME_MESSAGE';
export const ADD_TIME_MESSAGE_SUCCESS = 'ADD_TIME_MESSAGE_SUCCESS';
export const ADD_TIME_MESSAGE_FAILED = 'ADD_TIME_MESSAGE_FAILED';
export const addTimeMessage = data => ({
  types: [ADD_TIME_MESSAGE, ADD_TIME_MESSAGE_SUCCESS, ADD_TIME_MESSAGE_FAILED],
  promise: () => API.post(URL.addTimeMessage, data)
})

export const UPLOAD_TIME_IMAGE = 'UPLOAD_TIME_IMAGE';
export const uploadTimeImage = createAction(UPLOAD_TIME_IMAGE)

export const CLEAR_TIME_IMAGE = 'CLEAR_TIME_IMAGE';
export const clearTimeImage = createAction(CLEAR_TIME_IMAGE)

export const CLEAR_TIME = 'CLEAR_TIME';
export const clearTime = createAction(CLEAR_TIME)

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
export const fetchDeleteTime = ({ id }) => ({
  types: [DELETE_TIME, DELETE_TIME_SUCCESS, DELETE_TIME_FAILED],
  //promise: () => API.delete(URL.deleteTime)
  promise: () => API.delete(`${URL.times}?id=${id}`),
  meta: { id }
})
