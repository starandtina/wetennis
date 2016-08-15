import { createAction } from 'redux-actions';
import API from 'utils/API';
import URL from 'utils/url';
export const FETCH_MY_TIMES = 'FETCH_MY_TIMES';
export const FETCH_MY_TIMES_SUCCESS = 'FETCH_MY_TIMES_SUCCESS';
export const FETCH_MY_TIMES_FAILED = 'FETCH_MY_TIMES_FAILED';
export const fetchMyTimes = data => ({
  types: [FETCH_MY_TIMES, FETCH_MY_TIMES_SUCCESS, FETCH_MY_TIMES_FAILED],
  promise: () => API.post(URL.fetchMyTimes, data)
})