import {combineReducers} from "redux";

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
const PREFIXER = "EVENT_DETAILS_";
const GET_DETAILS = `${PREFIXER}GET_DETAILS`;
const GET_DETAILS_SUCCESS = `${PREFIXER}GET_DETAILS_SUCCESS`;
const GET_DETAILS_FAILTURE = `${PREFIXER}GET_DETAILS_FAILTURE`;


// ------------------------------------
// Actions
// ------------------------------------

export function getDetails(id) {
  return {
    types: [GET_DETAILS, GET_DETAILS_SUCCESS, GET_DETAILS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventDetails, {id})
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

export default combineReducers({
  details,
});
