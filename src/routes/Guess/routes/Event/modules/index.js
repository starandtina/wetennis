import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------


// fetch guess event infomation.
const FETCH_GUESS_EVENT_INFO = "FETCH_GUESS_EVENT_INFO";
const FETCH_GUESS_EVENT_INFO_SUCCESS = "FETCH_GUESS_EVENT_INFO_SUCCESS";
const FETCH_GUESS_EVENT_INFO_FAILTURE = "FETCH_GUESS_EVENT_INFO_FAILTURE";

// fetch guess event filter.
const FETCH_GUESS_EVENT_FILTER = "FETCH_GUESS_EVENT_FILTER";
const FETCH_GUESS_EVENT_FILTER_SUCCESS = "FETCH_GUESS_EVENT_FILTER_SUCCESS";
const FETCH_GUESS_EVENT_FILTER_FAILTURE = "FETCH_GUESS_EVENT_FILTER_FAILTURE";

// set guess event top level filter.
const SET_GUESS_EVENT_FILTER = "SET_GUESS_EVENT_FILTER";

// set sub group filter list.
const SET_GUESS_SUBGROUP_FILTER_LIST = 'SET_GUESS_SUBGROUP_FILTER_LIST'

// ------------------------------------
// Actions
// ------------------------------------

export function getGuessEventInfo (eventId) {
  return {
    types: [FETCH_GUESS_EVENT_INFO, FETCH_GUESS_EVENT_INFO_SUCCESS, FETCH_GUESS_EVENT_INFO_FAILTURE],
    promise: () => API.post(URLConf.fetchGuessEventInfo, {eventId})
  };
}

export function getGuessEventFilter (id) {
  return {
    types: [FETCH_GUESS_EVENT_FILTER, FETCH_GUESS_EVENT_FILTER_SUCCESS, FETCH_GUESS_EVENT_FILTER_FAILTURE],
    promise: () => API.post(URLConf.cascadeFilter, {type: "guessEventFilter", id})
  }
}

export function setCurrentFilter (filter) {
  return {
    type: SET_GUESS_EVENT_FILTER,
    payload: filter
  }
}

export function setSubGroupFilter (filter) {
  return {
    type: SET_GUESS_SUBGROUP_FILTER_LIST,
    payload: filter
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

function eventInfo (state = {
  eventDetail: {},
  games: []
}, {type, payload}) {
  let s = state

  if (type === FETCH_GUESS_EVENT_INFO_SUCCESS) {
    s = payload
  }
  return s
}

function eventFilter (state = [], {type, payload}) {
  let s = state

  if (type === FETCH_GUESS_EVENT_FILTER_SUCCESS) {
    s = payload
  }

  return s
}

function subGroupFilter (state = [], {type, payload}) {
  let s = state
  if (type === FETCH_GUESS_EVENT_FILTER_SUCCESS && Array.isArray(payload[0].children)) {
    s = payload[0].children
  } else if (type === SET_GUESS_SUBGROUP_FILTER_LIST) {
    s = payload
  }
  return s
}

function currentFilter (state = {
  group: "",
  subGroup: ""
}, {type, payload}) {

  let s = state

  if (type === FETCH_GUESS_EVENT_FILTER_SUCCESS) {
    if (Array.isArray(payload) && payload[0]) {
      let groupFilter = payload[0]
      const subGroupFilter = groupFilter.children
      const subGroupValue = Array.isArray(subGroupFilter) && subGroupFilter[0]
                            ? subGroupFilter[0].value
                            : ''
      s = {
        group: groupFilter.value,
        subGroup: subGroupValue
      }
    }
  } else if (type === SET_GUESS_EVENT_FILTER) {
    s = payload
  }

  return s
}


export default combineReducers({
  eventInfo, eventFilter, currentFilter, subGroupFilter
})
