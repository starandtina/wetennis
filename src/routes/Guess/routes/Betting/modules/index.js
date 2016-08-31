import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

const PREFIXER = `GUESS_BETTING_`;

const GET_INFO = `${PREFIXER}GET_INFO`;
const GET_INFO_SUCCESS = `${PREFIXER}GET_INFO_SUCCESS`;
const GET_INFO_FAILTURE = `${PREFIXER}GET_INFO_FAILTURE`;

const SUBMIT = `${PREFIXER}SUBMIT`;
const SUBMIT_SUCCESS = `${PREFIXER}SUBMIT_SUCCESS`;
const SUBMIT_FAILTURE = `${PREFIXER}SUBMIT_FAILTURE`;

// ------------------------------------
// Actions
// ------------------------------------

export function getInfo(eventId) {
  return {
    types: [GET_INFO, GET_INFO_SUCCESS, GET_INFO_FAILTURE],
    promise: () => API.post(URLConf.fetchBettingInfo, {eventId})
  }
}

export function submit(eventId, integral) {
  return {
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAILTURE],
    promise: () => API.post(URLConf.bettingSubmit, {eventId, integral})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

function info(state = {}, {type, payload}) {
  let s = state;

  if (type === GET_INFO_SUCCESS) {
    s = payload
  }

  return s;
}

export default combineReducers({
  info
})
