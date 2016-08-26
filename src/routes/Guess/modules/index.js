import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// get guess event list
const GET_GUESS_EVENT_LIST = "GET_GUESS_EVENT_LIST";
const GET_GUESS_EVENT_LIST_SUCCESS = "GET_GUESS_EVENT_LIST_SUCCESS";
const GET_GUESS_EVENT_LIST_FAILTURE = "GET_GUESS_EVENT_LIST_FAILTURE";

// ------------------------------------
// Actions
// ------------------------------------

export function getGuessEvents () {
  return {
    types: [GET_GUESS_EVENT_LIST, GET_GUESS_EVENT_LIST_SUCCESS, GET_GUESS_EVENT_LIST_FAILTURE],
    promise: () => API.post(URLConf.fetchGuessEvents)
  };
}

// ------------------------------------
// Reducer
// ------------------------------------

function guessEvents(state=[], {type, payload}) {
  let s = state;
  if (type === GET_GUESS_EVENT_LIST_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  guessEvents
});
