import API from 'utils/API';
import URLConf from 'utils/url';

// get event list.
export const GET_EVENT_LIST = "GET_EVENT_LIST";
export const GET_EVENT_LIST_SUCCESS = "GET_EVENT_LIST_SUCCESS";
export const GET_EVENT_LIST_FAILTURE = "GET_EVENT_LIST_FAILTURE";

// get event filter.
export const GET_EVENT_FILTER = "GET_EVENT_FILTER";
export const GET_EVENT_FILTER_SUCCESS = "GET_EVENT_FILTER_SUCCESS";
export const GET_EVENT_FILTER_FAILTURE = "GET_EVENT_FILTER_FAILTURE";

// modify filter.
export const MODIFY_EVENT_FILTER = "MODIFY_EVENT_FILTER";

// -----------------------------
// Action
// -----------------------------

export function getEventList(data) {
  return {
    types: [GET_EVENT_LIST, GET_EVENT_LIST_SUCCESS, GET_EVENT_LIST_FAILTURE],
    promise: () => API.post(URLConf.events, data)
  };
}

export function getFilter() {
  return {
    types: [GET_EVENT_FILTER, GET_EVENT_FILTER_SUCCESS, GET_EVENT_FILTER_FAILTURE],
    promise: () => API.post(URLConf.eventFilter)
  };
}

export function setCurrentFilter(data) {
  return {
    type: MODIFY_EVENT_FILTER,
    payload: data
  };
}


// -----------------------------
// Reducer
// -----------------------------
export function list(state = [], {type, payload}) {
  let s = state;
  switch (type) {
    case GET_EVENT_LIST_SUCCESS:
      s = payload;
      break;
  }

  return s;
}

export function location(state = [], {type, payload}) {
  let s = state;
  switch (type) {
    case GET_EVENT_FILTER_SUCCESS:
      s = payload.location;
      break;
  }
  return s;
}

export function status(state = [], {type, payload}) {
  let s = state;
  switch (type) {
    case GET_EVENT_FILTER_SUCCESS:
      s = payload.status;
      break;
  }
  return s;
}

export function currentFilter(state = {
  status: 1,
  eventFilter: "ALL",
  location: 1,
  currentPage: 1,
  limit: 30
}, {type, payload}) {
  let s = state;
  switch (type) {
    case MODIFY_EVENT_FILTER:
      s = payload;
      break;
  }

  return s;
}
