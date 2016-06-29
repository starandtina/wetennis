import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_EVENT_GRAWTABLE = 'FETCH_EVENT_GRAWTABLE'
export const FETCH_EVENT_GRAWTABLE_SUCCESS = 'FETCH_EVENT_GRAWTABLE_SUCCESS'
export const FETCH_EVENT_GRAWTABLE_FAILTURE = 'FETCH_EVENT_GRAWTABLE_FAILTURE'

export const SET_CURRENT_MATCH = "SET_CURRENT_MATCH";

// ------------------------------------
// Actions
// ------------------------------------
export const getDrawTable = function ({eventId, matchId}) {
  return {
    types: [FETCH_EVENT_GRAWTABLE, FETCH_EVENT_GRAWTABLE_SUCCESS, FETCH_EVENT_GRAWTABLE_FAILTURE],
    promise: () => API.post(URLConf.fetchEventDrawTable, {eventId, matchId})
  }
}

export const setCurrentMatch = function (matchId) {
  return {
    type: SET_CURRENT_MATCH,
    payload: matchId
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
function currentMatch(state = -1, {type, payload}) {
  let s = state;
  if (s === -1 &&
     type === FETCH_EVENT_GRAWTABLE_SUCCESS &&
     Array.isArray(payload.matchs)) {
    for (let i = 0, l = payload.matchs.length; i < l; i++) {
      let v = payload.matchs[i];
      if (v.current) {
        s = v.id;
        break;
      }
    }
  }

  if (type === SET_CURRENT_MATCH) {
    s = payload;
  }

  return s;
}

function data(state = {
  matchs: [],
  details: [],
  qualify: false,
}, {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_GRAWTABLE_SUCCESS) {
    s = payload;
  }

  return s;
}

export default combineReducers({
   currentMatch,
   data
});
