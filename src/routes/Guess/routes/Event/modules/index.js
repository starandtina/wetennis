import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

const FETCH_GUESS_EVENT_INFO = "FETCH_GUESS_EVENT_INFO";
const FETCH_GUESS_EVENT_INFO_SUCCESS = "FETCH_GUESS_EVENT_INFO_SUCCESS";
const FETCH_GUESS_EVENT_INFO_FAILTURE = "FETCH_GUESS_EVENT_INFO_FAILTURE";

// ------------------------------------
// Actions
// ------------------------------------

export function getGuessEventInfo(eventId) {
  return {
    types: [FETCH_GUESS_EVENT_INFO, FETCH_GUESS_EVENT_INFO_SUCCESS, FETCH_GUESS_EVENT_INFO_FAILTURE],
    promise: () => API.post(URLConf.fetchGuessEventInfo, {eventId})
  };
}

export function getGuessEventFilter(eventId) {
  
}



// ------------------------------------
// Reducer
// ------------------------------------

function eventInfo(state = {
  eventDetail: {},
  games: []
}, {type, payload}) {
  let s = state;

  if (type === FETCH_GUESS_EVENT_INFO_SUCCESS) {
    s = payload;
  }
  
  return s;
}


export default combineReducers({
  eventInfo
});
