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

// get comments
const GET_COMMENTS = `${PREFIXER}GET_COMMENTS`;
const GET_COMMENTS_SUCCESS = `${PREFIXER}GET_COMMENTS_SUCCESS`;
const GET_COMMENTS_FAILTURE = `${PREFIXER}GET_COMMENTS_FAILTURE`;

// get sponsors
const GET_SPONSORS = `${PREFIXER}GET_SPONSORS`;
const GET_SPONSORS_SUCCESS = `${PREFIXER}GET_SPONSORS_SUCCESS`;
const GET_SPONSORS_FAILTURE = `${PREFIXER}GET_SPONSORS_FAILTURE`;

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

export function getComments(id) {
  return {
    types: [GET_COMMENTS, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventComments, {id})
  };
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

function comments(state = {
  total: 0,
  comments: []
}, {type, payload}) {
  let s = state;
  if (type === GET_COMMENTS_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  details, comments, sponsors, notices
});
