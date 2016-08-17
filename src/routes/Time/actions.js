import { createAction } from 'redux-actions';
import API from 'utils/API';
import URL from 'utils/url';
export const FETCH_TIME = 'FETCH_TIME';
export const FETCH_TIME_SUCCESS = 'FETCH_TIME_SUCCESS';
export const FETCH_TIME_FAILED = 'FETCH_TIME_FAILED';
export const fetchTime = data => ({
  types: [FETCH_TIME, FETCH_TIME_SUCCESS, FETCH_TIME_FAILED],
  promise: () => API.post(URL.fetchTime, data)
})

export const FETCH_TIME_INFO = 'FETCH_TIME_INFO';
export const FETCH_TIME_INFO_SUCCESS = 'FETCH_TIME_INFO_SUCCESS';
export const FETCH_TIME_INFO_FAILED = 'FETCH_TIME_INFO_FAILED';
export const fetchTimeInfo = data => ({
  types: [FETCH_TIME_INFO, FETCH_TIME_INFO_SUCCESS, FETCH_TIME_INFO_FAILED],
  promise: () => API.post(URL.fetchTimeInfo, data)
})