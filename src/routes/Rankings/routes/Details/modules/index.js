import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// fetch rankings details info
export const FETCH_RANKING_DETAILS_INFO = "FETCH_RANKING_DETAILS_INFO";
export const FETCH_RANKING_DETAILS_INFO_SUCCESS = "FETCH_RANKING_DETAILS_INFO_SUCCESS";
export const FETCH_RANKING_DETAILS_INFO_FAILTURE = "FETCH_RANKING_DETAILS_INFO_FAILTURE";

// fetch single tabs info 
export const FETCH_RANKING_SINGLE_TAB = "FETCH_RANKING_SINGLE_TAB";
export const FETCH_RANKING_SINGLE_TAB_SUCCESS = "FETCH_RANKING_SINGLE_TAB_SUCCESS";
export const FETCH_RANKING_SINGLE_TAB_FAILTURE = "FETCH_RANKING_SINGLE_TAB_FAILTURE";

// fetch double tabs info 
export const FETCH_RANKING_DOUBLE_TAB = "FETCH_RANKING_DOUBLE_TAB";
export const FETCH_RANKING_DOUBLE_TAB_SUCCESS = "FETCH_RANKING_DOUBLE_TAB_SUCCESS";
export const FETCH_RANKING_DOUBLE_TAB_FAILTURE = "FETCH_RANKING_DOUBLE_TAB_FAILTURE";

// like user
export const RANKING_LIKE_USER = "RANKING_LIKE_USER";
export const RANKING_LIKE_USER_SUCCESS = "RANKING_LIKE_USER_SUCCESS";
export const RANKING_LIKE_USER_FAILTURE = "RANKING_LIKE_USER_FAILTURE";

// ------------------------------------
// Actions
// ------------------------------------

export const getInfo = (userId) => ({
  types: [FETCH_RANKING_DETAILS_INFO, FETCH_RANKING_DETAILS_INFO_SUCCESS, FETCH_RANKING_DETAILS_INFO_FAILTURE],
  promise: () => API.post(URLConf.fetchRankingDetailsInfo, {userId})
});

export const getSingleTab = (userId) => ({
  types: [FETCH_RANKING_SINGLE_TAB, FETCH_RANKING_SINGLE_TAB_SUCCESS, FETCH_RANKING_SINGLE_TAB_FAILTURE],
  promise: () => API.post(URLConf.fetchRankingDetailsTab, {userId, type: "single"})
});

export const getDoubleTab = (userId) => ({
  types: [FETCH_RANKING_DOUBLE_TAB, FETCH_RANKING_DOUBLE_TAB_SUCCESS, FETCH_RANKING_DOUBLE_TAB_FAILTURE],
  promise: () => API.post(URLConf.fetchRankingDetailsTab, {userId, type: "double"})
});

export const likeUser = (userId, status) => {
  return dispatch => {
    dispatch({
      types: [RANKING_LIKE_USER, RANKING_LIKE_USER_SUCCESS, RANKING_LIKE_USER_FAILTURE],
      promise: () => API.post(URLConf.like, {userId, status})
    }).then(() => {
      dispatch(getInfo(userId));
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const info = (state = {}, {payload, type}) => {
  let s = state;

  if (type === FETCH_RANKING_DETAILS_INFO_SUCCESS) {
    s = payload;
  }
  
  return s;
};

const singleTab = (state = {}, {payload, type}) => {
  let s = state;

  if (type === FETCH_RANKING_SINGLE_TAB_SUCCESS) {
    s = payload;
  }
  
  return s;
  
};

const doubleTab = (state = {}, {payload, type}) => {
  let s = state;

  if (type === FETCH_RANKING_DOUBLE_TAB_SUCCESS) {
    s = payload;
  }
  
  return s;
  
};

export default combineReducers({
  info, singleTab, doubleTab
});
