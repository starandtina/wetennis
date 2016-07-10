import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// get rankings
export const FETCH_RANKINGS = 'FETCH_RANKINGS'
export const FETCH_RANKINGS_SUCCESS = 'FETCH_RANKINGS_SUCCESS'
export const FETCH_RANKINGS_FAILTURE = 'FETCH_RANKINGS_FAILTURE'

// get rankings filter
export const FETCH_RANKINGS_FILTER = 'FETCH_RANKINGS_FILTER'
export const FETCH_RANKINGS_FILTER_SUCCESS = 'FETCH_RANKINGS_FILTER_SUCCESS'
export const FETCH_RANKINGS_FILTER_FAILTURE = 'FETCH_RANKINGS_FILTER_FAILTURE'

export const SET_RANKINGS_CURRENT_FILTER = "SET_RANKINGS_CURRENT_FILTER"

// ------------------------------------
// Actions
// ------------------------------------

export const getRankings = id => ({
  types:[FETCH_RANKINGS, FETCH_RANKINGS_SUCCESS, FETCH_RANKINGS_FAILTURE],
  promise: () => API.post(URLConf.fetchRankings, {id})
});

export const getRankingsFilter = id => ({
  types:[FETCH_RANKINGS_FILTER, FETCH_RANKINGS_FILTER_SUCCESS, FETCH_RANKINGS_FILTER_FAILTURE],
  promise: () => API.post(URLConf.fetchRankingsFilter, {id})
});

export const setCurrentFilter = id => ({
  type: SET_RANKINGS_CURRENT_FILTER,
  payload: id
});

// ------------------------------------
// Reducer
// ------------------------------------

function rankings(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_RANKINGS_SUCCESS) {
    s = payload;
  }
  return s;
}

function filters(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_RANKINGS_FILTER_SUCCESS) {
    s = payload;
  }
  return s;
}

function currentFilter(state = 0, {type, payload}) {
  let s = state;
  if (type === FETCH_RANKINGS_FILTER_SUCCESS) {
    if (Array.isArray(payload) && payload.length > 0) {
      s = payload[0].value;
    }
  }
  if (type === SET_RANKINGS_CURRENT_FILTER) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  rankings, filters, currentFilter
});
