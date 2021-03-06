import {combineReducers} from "redux";

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

const PREFIXER = "EVENT_DETAILS_";
// get details
const GET_DETAILS = `${PREFIXER}GET_DETAILS`;
const GET_DETAILS_SUCCESS = `${PREFIXER}GET_DETAILS_SUCCESS`;
const GET_DETAILS_FAILTURE = `${PREFIXER}GET_DETAILS_FAILTURE`;

// get notices
const GET_NOTICES = `${PREFIXER}GET_NOTICES`;
const GET_NOTICES_SUCCESS = `${PREFIXER}GET_NOTICES_SUCCESS`;
const GET_NOTICES_FAILTURE = `${PREFIXER}GET_NOTICES_FAILTURE`;

// get sponsors
const GET_SPONSORS = `${PREFIXER}GET_SPONSORS`;
const GET_SPONSORS_SUCCESS = `${PREFIXER}GET_SPONSORS_SUCCESS`;
const GET_SPONSORS_FAILTURE = `${PREFIXER}GET_SPONSORS_FAILTURE`;

// event draw
const EVENT_DRAW = `${PREFIXER}EVENT_DRAW`;
const EVENT_DRAW_SUCCESS = `${PREFIXER}EVENT_DRAW_SUCCESS`;
const EVENT_DRAW_FAILTURE = `${PREFIXER}EVENT_DRAW_FAILTURE`;

// event follow
const EVENT_FOLLOW = `${PREFIXER}EVENT_FOLLOW`;
const EVENT_FOLLOW_SUCCESS = `${PREFIXER}EVENT_FOLLOW_SUCCESS`;
const EVENT_FOLLOW_FAILTURE = `${PREFIXER}EVENT_FOLLOW_FAILTURE`;

// ------------------------------------
// Actions
// ------------------------------------

export function getDetails(id) {
  return {
    types: [GET_DETAILS, GET_DETAILS_SUCCESS, GET_DETAILS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventDetails, {id})
  };
}

export function getNotices(id) {
  return {
    types: [GET_NOTICES, GET_NOTICES_SUCCESS, GET_NOTICES_FAILTURE],
    promise: () => API.post(URLConf.fetchEventNotices, {id})
  };
}

export function follow (eventId) {
  return dispatch => {
    dispatch({
      types: [EVENT_FOLLOW, EVENT_FOLLOW_SUCCESS, EVENT_FOLLOW_FAILTURE],
      promise: () => API.post(URLConf.eventFollow, {eventId})
    }).then(({payload: {code, data}}) => {
      if (Number(code) === 0 && data === "ok") {
        dispatch(getDetails(eventId));
      }
    })
  }
}

export function draw (eventId) {
  return dispatch => {
    dispatch({
      types: [EVENT_DRAW, EVENT_DRAW_SUCCESS, EVENT_DRAW_FAILTURE],
      promise: () => API.post(URLConf.eventDraw, {eventId})
    }).then(({payload: {code, data}}) => {
      if (Number(code) === 0 && data === "ok") {
        dispatch(getDetails(eventId));
      }
    })
  }
}

export function getSponsors(id) {
  return {
    types: [GET_SPONSORS, GET_SPONSORS_SUCCESS, GET_SPONSORS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventSponsors, {id})
  };
}
// ------------------------------------
// Reducer
// ------------------------------------

function details(state = {
  thumb: "",
  name: "",
  location: "",
  startDate: "",
  endDate: "",
  banner: ""
}, {type, payload}) {
  let s = state;
  if (type === GET_DETAILS_SUCCESS) {
    s = payload;
  }
  return s;
}

function notices(state = [], {type, payload}) {
  let s = state;
  if (type === GET_NOTICES_SUCCESS) {
    s = payload;
  }
  return s;
}

function sponsors(state = [], {type, payload}) {
  let s = state;
  if (type === GET_SPONSORS_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  details, sponsors, notices
});
