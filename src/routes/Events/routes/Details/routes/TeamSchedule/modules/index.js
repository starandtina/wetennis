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

export const SET_LOCATION_FILTERS = 'SET_LOCATION_FILTERS'

// ------------------------------------
// Actions
// ------------------------------------
export const getFilter = id => ({
  types: [FETCH_EVENT_SCHEDULE_FILTER, FETCH_EVENT_SCHEDULE_FILTER_SUCCESS, FETCH_EVENT_SCHEDULE_FILTER_FAILTURE],
  promise: () => API.post(URLConf.cascadeFilter, {id, type: "eventTeamScheduleFilter"})
});

export const getSchedule = ({eventId, teamId, date, location}) => ({
  types: [FETCH_EVENT_SCHEDULE, FETCH_EVENT_SCHEDULE_SUCCESS, FETCH_EVENT_SCHEDULE_FAILTURE],
  promise: () => API.post(URLConf.fetchEventSchedule, {eventId, teamId, date, location})
});

export const setCurrentFilter = (eventId, teamId, currentFilter) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_EVENT_SCHEDULE_FILTER,
      payload: currentFilter
    });
    dispatch(getSchedule({
      eventId,
      teamId,
      date: currentFilter.date.value,
      location: currentFilter.location.value
    }));
  }
   
};

export const updateLocationFilters = (filters) => ({
  type: SET_LOCATION_FILTERS,
  payload: filters
})
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
    let date = payload[0];
    let location = {};
    for (let v of payload) {
      if (v.current) {
        date = v;
        break;
      }
    }
    if (date.children && date.children.length > 0) {
      location = date.children[0]
    }
    s = {location, date};
  }

  return s;
}

function filters(state = {
  location: [],
  date: []
}, {type, payload}) {
  let s = state;

  if (type === FETCH_EVENT_SCHEDULE_FILTER_SUCCESS) {
    const date = payload;
    let current = payload[0];
    let location = [];
    for (let v of payload) {
      if (v.current) {
        current = v;
        break;
      }
    }
    if (current.children && current.children.length > 0) {
      location = current.children;
    }
    s = {location, date};
  }
  if (type === SET_LOCATION_FILTERS) {
    s.location = payload;
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
  currentFilter, filters, schedule, updateLocationFilters
});
