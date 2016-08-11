import {combineReducers} from "redux";

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

const PREFIXER = "EVENT_MATCH_";
// get details
const GET_DETAILS = `${PREFIXER}GET_DETAILS`;
const GET_DETAILS_SUCCESS = `${PREFIXER}GET_DETAILS_SUCCESS`;
const GET_DETAILS_FAILTURE = `${PREFIXER}GET_DETAILS_FAILTURE`;

// get match comments
const GET_COMMENTS = `${PREFIXER}GET_COMMENTS`;
const GET_COMMENTS_SUCCESS = `${PREFIXER}GET_COMMENTS_SUCCESS`;
const GET_COMMENTS_FAILTURE = `${PREFIXER}GET_COMMENTS_FAILTURE`;

// like match comment
const LIKE_COMMENTS = `${PREFIXER}LIKE_COMMENTS`;
const LIKE_COMMENTS_SUCCESS = `${PREFIXER}LIKE_COMMENTS_SUCCESS`;
const LIKE_COMMENTS_FAILTURE = `${PREFIXER}LIKE_COMMENTS_FAILTURE`;

// send match comment
const SEND_COMMENTS = `${PREFIXER}SEND_COMMENTS`;
const SEND_COMMENTS_SUCCESS = `${PREFIXER}SEND_COMMENTS_SUCCESS`;
const SEND_COMMENTS_FAILTURE = `${PREFIXER}SEND_COMMENTS_FAILTURE`;

// get match comments
const GET_TECHNICAL_STATISTICS = `${PREFIXER}GET_TECHNICAL_STATISTICS`;
const GET_TECHNICAL_STATISTICS_SUCCESS = `${PREFIXER}GET_TECHNICAL_STATISTICS_SUCCESS`;
const GET_TECHNICAL_STATISTICS_FAILTURE = `${PREFIXER}GET_TECHNICAL_STATISTICS_FAILTURE`;

// ------------------------------------
// Actions
// ------------------------------------


export function getDetails (matchId) {
  return {
    types: [GET_DETAILS, GET_DETAILS_SUCCESS, GET_DETAILS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventMatchInfo, {matchId})
  }
}

export function getComments(matchId) {
  return {
    types: [GET_COMMENTS, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventMatchComments, {matchId})
  }
}

export function likeComment(matchId, commentId) {
  return dispatch => {
    dispatch({
      types: [LIKE_COMMENTS, LIKE_COMMENTS_SUCCESS, LIKE_COMMENTS_FAILTURE],
      promise: () => API.post(URLConf.likeEventMatchComments, {matchId, commentId})
    }).then(({payload: {code, data}}) => {
      if (Number(code) === 0 && data === "ok") {
        dispatch(getComments(matchId));
      }
    })
  }
}

export function sendComment(matchId, text) {
  return dispatch => {
    dispatch({
      types: [SEND_COMMENTS, SEND_COMMENTS_SUCCESS, SEND_COMMENTS_FAILTURE],
      promise: () => API.post(URLConf.sendEventMatchComments, {matchId, text})
    }).then(({payload: {code, data}}) => {
      if (Number(code) === 0 && data === "ok") {
        dispatch(getComments(matchId));
      }
    })
  }
}

export function getTechnicalStatistics(matchId) {
  return {
    types: [GET_TECHNICAL_STATISTICS, GET_TECHNICAL_STATISTICS_SUCCESS, GET_TECHNICAL_STATISTICS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventMatchTechnicalStatistics, {matchId})
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

function comments(state = {
  total: -1,
  comments: []
}, {type, payload}) {
  let s = state;

  if (type === GET_COMMENTS_SUCCESS) {
    s = payload;
  }

  return s;
}

function details (state = {
  status: 0,
  eventName: '',
  matchName: '',
  time: '',
  location: '',
  gameTime: '',
  games: [],
  teams: [],
  scoreDetails: []
}, {type, payload}) {
  let s = state
  if (type === GET_DETAILS_SUCCESS) {
    s = payload
  }
  return s
}

function technicalStatistics(state = [], {type, payload}) {
  let s = state;

  if (type === GET_TECHNICAL_STATISTICS_SUCCESS) {
    s = payload;
  }

  return s;
}


export default combineReducers({
  details, comments, technicalStatistics
})
