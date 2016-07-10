import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// get event score
export const FETCH_EVENT_SCHEDULE = 'FETCH_EVENT_SCHEDULE'
export const FETCH_EVENT_SCHEDULE_SUCCESS = 'FETCH_EVENT_SCHEDULE_SUCCESS'
export const FETCH_EVENT_SCHEDULE_FAILTURE = 'FETCH_EVENT_SCHEDULE_FAILTURE'

// get event filter
export const FETCH_EVENT_SCHEDULE_FILTER = 'FETCH_EVENT_SCHEDULE_FILTER'
export const FETCH_EVENT_SCHEDULE_FILTER_SUCCESS = 'FETCH_EVENT_SCHEDULE_FILTER_SUCCESS'
export const FETCH_EVENT_SCHEDULE_FILTER_FAILTURE = 'FETCH_EVENT_SCHEDULE_FILTER_FAILTURE'

// set current filter
export const SET_CURRENT_EVENT_SCHEDULE_FILTER = 'SET_CURRENT_EVENT_SCHEDULE_FILTER'

// ------------------------------------
// Actions
// ------------------------------------
export const getFilter = id => ({
  types: [FETCH_EVENT_SCHEDULE_FILTER, FETCH_EVENT_SCHEDULE_FILTER_SUCCESS, FETCH_EVENT_SCHEDULE_FILTER_FAILTURE],
  promise: () => API.post(URLConf.fetchEventScheduleFilter, {id})
});

export const getSchedule = id => ({
  types: [FETCH_EVENT_SCHEDULE, FETCH_EVENT_SCHEDULE_SUCCESS, FETCH_EVENT_SCHEDULE_FAILTURE],
  promise: () => API.post(URLConf.fetchEventSchedule, {id})
});

export const setCurrentFilter = (currentFilter) => ({
  type: SET_CURRENT_EVENT_SCHEDULE_FILTER,
  payload: currentFilter
});
// ------------------------------------
// Reducer
// ------------------------------------

function currentFilter(state = {
  location: 0,
  date: 0
}, {type, payload}) {
  let s = state;
  if (type === SET_CURRENT_EVENT_SCHEDULE_FILTER) {
    s = payload
  } else if (type === FETCH_EVENT_SCHEDULE_FILTER_SUCCESS) {
    s = {};
    s.location = payload.location[0].value;
    s.date = payload.date[0].value;
  }

  return s;
}

function filters(state = {
  location: [],
  date: []
}, {type, payload}) {
  let s = state;

  if (type === FETCH_EVENT_SCHEDULE_FILTER_SUCCESS) {
    s = payload;
  }

  return s;
}

function schedule(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_SCHEDULE_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  currentFilter, filters, schedule
});
