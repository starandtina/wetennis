import {combineReducers} from "redux";
import API from 'utils/API';
import URLConf from 'utils/url';

// ------------------------------------
// Constants
// ------------------------------------
const PRE_FIX = 'EVENTS_INFOMATION';
export const GET_INFOMATION = `${PRE_FIX}GET_INFOMATION`;
export const GET_INFOMATION_SUCCESS = `${PRE_FIX}GET_INFOMATION_SUCCESS`;
export const GET_INFOMATION_FAILTURE = `${PRE_FIX}GET_INFOMATION_FAILTURE`;

// ------------------------------------
// Actions
// ------------------------------------
export const getInfomation = function(eventId) {
  return {
    types: [GET_INFOMATION, GET_INFOMATION_SUCCESS, GET_INFOMATION_FAILTURE],
    promise: () => API.post(URLConf.fetchEventInfomation, {eventId})
  };
}


// ------------------------------------
// Reducers
// ------------------------------------

function infomation(state = {}, {type, payload}) {
  let s = state;
  if (type === GET_INFOMATION_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  infomation
});
