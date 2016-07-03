import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// get event score
export const FETCH_EVENT_SCORE = 'FETCH_EVENT_SCORE'
export const FETCH_EVENT_SCORE_SUCCESS = 'FETCH_EVENT_SCORE_SUCCESS'
export const FETCH_EVENT_SCORE_FAILTURE = 'FETCH_EVENT_SCORE_FAILTURE'

// get event filter
export const FETCH_EVENT_SCORE_FILTER = 'FETCH_EVENT_SCORE_FILTER'
export const FETCH_EVENT_SCORE_FILTER_SUCCESS = 'FETCH_EVENT_SCORE_FILTER_SUCCESS'
export const FETCH_EVENT_SCORE_FILTER_FAILTURE = 'FETCH_EVENT_SCORE_FILTER_FAILTURE'

// set current filter
export const SET_CURRENT_EVENT_SCORE_FILTER = 'SET_CURRENT_EVENT_SCORE_FILTER'

// ------------------------------------
// Actions
// ------------------------------------
export const getFilter = id => ({
  types: [FETCH_EVENT_SCORE_FILTER, FETCH_EVENT_SCORE_FILTER_SUCCESS, FETCH_EVENT_SCORE_FILTER_FAILTURE],
  promise: () => API.post(URLConf.fetchEventScoreFilter, {id})
});

export const getScore = id => ({
  types: [FETCH_EVENT_SCORE, FETCH_EVENT_SCORE_SUCCESS, FETCH_EVENT_SCORE_FAILTURE],
  promise: () => API.post(URLConf.fetchEventScore, {id})
});

export const setCurrentFilter = (currentFilter) => ({
  type: SET_CURRENT_EVENT_SCORE_FILTER,
  payload: currentFilter
});
// ------------------------------------
// Reducer
// ------------------------------------

function currentFilter(state = {
  status: 0,
  type: 0
}, {type, payload}) {
  let s = state;
  if (type === SET_CURRENT_EVENT_SCORE_FILTER) {
    s = payload
  } else if (type === FETCH_EVENT_SCORE_FILTER_SUCCESS) {
    s = {};
    s.status = payload.status[0].value;
    s.type = payload.type[0].value;
  }

  return s;
}

function filters(state = {
  status: [],
  type: []
}, {type, payload}) {
  let s = state;

  if (type === FETCH_EVENT_SCORE_FILTER_SUCCESS) {
    s = payload;
  }

  return s;
}

function score(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_SCORE_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  currentFilter, filters, score
});
