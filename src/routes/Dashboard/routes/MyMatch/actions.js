import API from 'utils/API'
import URLConf from 'utils/url'

export const FETCH_MY_MATCH = 'FETCH_MY_MATCH';
export const FETCH_MY_MATCH_SUCCESS = 'FETCH_MY_MATCH_SUCCESS';
export const FETCH_MY_MATCH_FAILTURE = 'FETCH_MY_MATCH_FAILTURE';

export const FETCH_MY_PRACTICE = 'FETCH_MY_PRACTICE';
export const FETCH_MY_PRACTICE_SUCCESS = 'FETCH_MY_PRACTICE_SUCCESS';
export const FETCH_MY_PRACTICE_FAILTURE = 'FETCH_MY_PRACTICE_FAILTURE';

export const fetchMyMatch = data => ({
  types: [FETCH_MY_MATCH, FETCH_MY_MATCH_SUCCESS, FETCH_MY_MATCH_FAILTURE],
  promise: () => API.post(URLConf.fetchMyMatch, data)
});

export const fetchMyPractice = data => ({
  types: [FETCH_MY_PRACTICE, FETCH_MY_PRACTICE_SUCCESS, FETCH_MY_PRACTICE_FAILTURE],
  promise: () => API.post(URLConf.fetchMyPractice, data)
});
