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
export const FETCH_EVENT_SCORE_STATE_FILTER = 'FETCH_EVENT_SCORE_STATE_FILTER'
export const FETCH_EVENT_SCORE_STATE_FILTER_SUCCESS = 'FETCH_EVENT_SCORE_STATE_FILTER_SUCCESS'
export const FETCH_EVENT_SCORE_STATE_FILTER_FAILTURE = 'FETCH_EVENT_SCORE_STATE_FILTER_FAILTURE'

// get event filter
export const FETCH_EVENT_SCORE_GROUP_FILTER = 'FETCH_EVENT_SCORE_GROUP_FILTER'
export const FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS = 'FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS'
export const FETCH_EVENT_SCORE_GROUP_FILTER_FAILTURE = 'FETCH_EVENT_SCORE_GROUP_FILTER_FAILTURE'

// set current filter
export const SET_CURRENT_EVENT_SCORE_FILTER = 'SET_CURRENT_EVENT_SCORE_FILTER'

// ------------------------------------
// Actions
// ------------------------------------
export const getStateFilter = id => ({
  types: [FETCH_EVENT_SCORE_STATE_FILTER, FETCH_EVENT_SCORE_STATE_FILTER_SUCCESS, FETCH_EVENT_SCORE_STATE_FILTER_FAILTURE],
  promise: () => API.post(URLConf.fetchEventScoreStateFilter, {id})
});

export const getGroupFilter = id => ({
  types: [FETCH_EVENT_SCORE_GROUP_FILTER, FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS, FETCH_EVENT_SCORE_GROUP_FILTER_FAILTURE],
  promise: () => API.post(URLConf.cascadeFilter, {id, type: "eventScore"})
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
  itemId: 0
}, {type, payload}) {
  let s = state;
  if (type === SET_CURRENT_EVENT_SCORE_FILTER) {
    s = payload
  } else if (type === FETCH_EVENT_SCORE_STATE_FILTER_SUCCESS) {
    s.status = payload[0].value;
  } else if (type === FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS) {
    s.itemId = payload[0].value;
  }

  return s;
}

function filters(state = {
  status: [],
  itemId: []
}, {type, payload}) {
  let s = state;

  if (type === FETCH_EVENT_SCORE_STATE_FILTER_SUCCESS) {
    s.status = payload;
  }

  if (type === FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS) {
    s.itemId = payload;
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
