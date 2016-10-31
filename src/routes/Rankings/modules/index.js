import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// get rankings
export const FETCH_RANKINGS = 'FETCH_RANKINGS'
export const FETCH_RANKINGS_SUCCESS = 'FETCH_RANKINGS_SUCCESS'
export const FETCH_RANKINGS_FAILTURE = 'FETCH_RANKINGS_FAILTURE'

// get ranking types
export const FETCH_RANKING_TYPE = 'FETCH_RANKING_TYPE'
export const FETCH_RANKING_TYPE_SUCCESS = 'FETCH_RANKING_TYPE_SUCCESS'
export const FETCH_RANKING_TYPE_FAILTURE = 'FETCH_RANKING_TYPE_FAILTURE'

// get rankings filter
export const FETCH_RANKINGS_FILTER = 'FETCH_RANKINGS_FILTER'
export const FETCH_RANKINGS_FILTER_SUCCESS = 'FETCH_RANKINGS_FILTER_SUCCESS'
export const FETCH_RANKINGS_FILTER_FAILTURE = 'FETCH_RANKINGS_FILTER_FAILTURE'

export const SET_RANKINGS_CURRENT_FILTER = "SET_RANKINGS_CURRENT_FILTER"
export const SET_RANKINGS_CURRENT_RANKING_TYPE = "SET_RANKINGS_CURRENT_RANKING_TYPE"

// ------------------------------------
// Actions
// ------------------------------------

export const getRankings = (value, rankId, currentPage = 1, limit = 10) => ({
  types:[FETCH_RANKINGS, FETCH_RANKINGS_SUCCESS, FETCH_RANKINGS_FAILTURE],
  promise: () => API.post(URLConf.fetchRankings, {
    value: value,
    rankId: rankId,
    currentPage: currentPage,
    limit: limit,
  })
});

export const getRankingType = () => ({
  types:[FETCH_RANKING_TYPE, FETCH_RANKING_TYPE_SUCCESS, FETCH_RANKING_TYPE_FAILTURE],
  promise: () => API.post(URLConf.fetchRankingType)
});


export const setCurrentRankingType = id => ({
  type: SET_RANKINGS_CURRENT_RANKING_TYPE,
  payload: id
});

export const getRankingsFilter = id => ({
  types:[FETCH_RANKINGS_FILTER, FETCH_RANKINGS_FILTER_SUCCESS, FETCH_RANKINGS_FILTER_FAILTURE],
  promise: () => API.post(URLConf.cascadeFilter, {id, type: 'rankings'})
});

export const setCurrentFilter = id => ({
  type: SET_RANKINGS_CURRENT_FILTER,
  payload: id
});

// ------------------------------------
// Reducer
// ------------------------------------

function rankings(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_RANKINGS_SUCCESS) {
    s = payload;
  }
  return s;
}

function rankingType(state=[], {type, payload}) {
  let s = state;
  if (type === FETCH_RANKING_TYPE_SUCCESS) {
    s = payload;
  }
  return s;
}

function currentRankingType(state = '', {type, payload}) {
  let s = state;
  if (type === FETCH_RANKING_TYPE_SUCCESS) {
    if (Array.isArray(payload) && payload.length > 0) {
      s = payload[0].value;
    }
  }
  if (type === SET_RANKINGS_CURRENT_RANKING_TYPE) {
    s = payload;
  }
  return s;
}

function filters(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_RANKINGS_FILTER_SUCCESS) {
    s = payload;
  }
  return s;
}

function currentFilter(state = '', {type, payload}) {
  let s = state;
  if (type === FETCH_RANKINGS_FILTER_SUCCESS) {
    if (Array.isArray(payload) && payload.length > 0) {
      s = payload[0].value;
    }
  }
  if (type === SET_RANKINGS_CURRENT_FILTER) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  rankings, filters, currentFilter, rankingType, currentRankingType,
});
