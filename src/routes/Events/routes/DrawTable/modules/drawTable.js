import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_EVENT_GRAWTABLE = 'FETCH_EVENT_GRAWTABLE'
export const FETCH_EVENT_GRAWTABLE_SUCCESS = 'FETCH_EVENT_GRAWTABLE_SUCCESS'
export const FETCH_EVENT_GRAWTABLE_FAILTURE = 'FETCH_EVENT_GRAWTABLE_FAILTURE'


export const FETCH_EVENT_GRAWTABLE_FILTER = 'FETCH_EVENT_GRAWTABLE_FILTER'
export const FETCH_EVENT_GRAWTABLE_FILTER_SUCCESS = 'FETCH_EVENT_GRAWTABLE_FILTER_SUCCESS'
export const FETCH_EVENT_GRAWTABLE_FILTER_FAILTURE = 'FETCH_EVENT_GRAWTABLE_FILTER_FAILTURE'

export const SET_CURRENT_MATCH = "SET_CURRENT_MATCH";
export const SET_CURRENT_FILTER = "SET_CURRENT_FILTER";

// ------------------------------------
// Actions
// ------------------------------------
export const getDrawTable = function ({itemId, round}) {
  return {
    types: [FETCH_EVENT_GRAWTABLE, FETCH_EVENT_GRAWTABLE_SUCCESS, FETCH_EVENT_GRAWTABLE_FAILTURE],
    promise: () => API.post(URLConf.fetchEventDrawTable, {itemId, round})
  }
}

export const getFilter = function (eventId) {
  return {
    types: [FETCH_EVENT_GRAWTABLE_FILTER, FETCH_EVENT_GRAWTABLE_FILTER_SUCCESS, FETCH_EVENT_GRAWTABLE_FILTER_FAILTURE],
    promise: () => API.post(URLConf.cascadeFilter, {id: eventId, type: "eventDrawTableFilter"})
  }
}

export const setCurrentMatch = function (matchId) {
  return {
    type: SET_CURRENT_MATCH,
    payload: matchId
  }
}

export const setCurrentFilter = function (type) {
  return {
    type: SET_CURRENT_FILTER,
    payload: type
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

function filters(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_GRAWTABLE_FILTER_SUCCESS) {
    s = payload;
  }
  return s;
}

function currentFilter(state = {}, {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_GRAWTABLE_FILTER_SUCCESS) {
    s = payload[0].value;
  }
  if (type === SET_CURRENT_FILTER) {
    s = payload;
  }
  return s;
}

function currentMatch(state = -1, {type, payload}) {
  let s = state;
  if (s === -1 &&
     type === FETCH_EVENT_GRAWTABLE_SUCCESS &&
     Array.isArray(payload.matchs)) {
    for (let i = 0, l = payload.matchs.length; i < l; i++) {
      let v = payload.matchs[i];
      if (v.current) {
        s = v.id;
        break;
      }
    }
  }

  if (type === SET_CURRENT_MATCH) {
    s = payload;
  }

  return s;
}

function data(state = {
  matchs: [],
  details: [],
  qualify: false,
}, {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_GRAWTABLE_SUCCESS) {
    s = payload;
  }

  return s;
}

export default combineReducers({
  currentFilter,
  filters,
  currentMatch,
  data
});
