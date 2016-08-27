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
const GET_TECHNICAL_STATISTICS = `${PREFIXER}GET_TECHNICAL_STATISTICS`;
const GET_TECHNICAL_STATISTICS_SUCCESS = `${PREFIXER}GET_TECHNICAL_STATISTICS_SUCCESS`;
const GET_TECHNICAL_STATISTICS_FAILTURE = `${PREFIXER}GET_TECHNICAL_STATISTICS_FAILTURE`;

// get match comments
const GET_GUESS = `${PREFIXER}GET_GUESS`;
const GET_GUESS_SUCCESS = `${PREFIXER}GET_GUESS_SUCCESS`;
const GET_GUESS_FAILTURE = `${PREFIXER}GET_GUESS_FAILTURE`;

// ------------------------------------
// Actions
// ------------------------------------


export function getDetails (matchId) {
  return {
    types: [GET_DETAILS, GET_DETAILS_SUCCESS, GET_DETAILS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventMatchInfo, {matchId})
  }
}

export function getTechnicalStatistics(matchId) {
  return {
    types: [GET_TECHNICAL_STATISTICS, GET_TECHNICAL_STATISTICS_SUCCESS, GET_TECHNICAL_STATISTICS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventMatchTechnicalStatistics, {matchId})
  }
}

export function getGuess(matchId) {
  return {
    types: [GET_GUESS, GET_GUESS_SUCCESS, GET_GUESS_FAILTURE],
    promise: () => API.post(URLConf.fetchEventMatchGuess, {matchId})
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

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

function guess(state = {
  key: {
    team1: {},
    team2: {},
  },
  score: []
}, {type, payload}) {
  let s = state;

  if (type === GET_GUESS_SUCCESS) {
    s = payload;
  }

  return s;
}

export default combineReducers({
  details, technicalStatistics, guess
})
