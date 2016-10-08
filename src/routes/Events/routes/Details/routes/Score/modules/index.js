import {combineReducers} from "redux";
import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

// get event score
export const FETCH_EVENT_SCORE = 'FETCH_EVENT_SCORE'
export const FETCH_EVENT_SCORE_SUCCESS = 'FETCH_EVENT_SCORE_SUCCESS'
export const FETCH_EVENT_SCORE_FAILTURE = 'FETCH_EVENT_SCORE_FAILTURE'


// get event filter
export const FETCH_EVENT_SCORE_GROUP_FILTER = 'FETCH_EVENT_SCORE_GROUP_FILTER'
export const FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS = 'FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS'
export const FETCH_EVENT_SCORE_GROUP_FILTER_FAILTURE = 'FETCH_EVENT_SCORE_GROUP_FILTER_FAILTURE'

// set current filter
export const SET_CURRENT_EVENT_SCORE_FILTER = 'SET_CURRENT_EVENT_SCORE_FILTER'

// ------------------------------------
// Actions
// ------------------------------------
export const getGroupFilter = id => ({
  types: [FETCH_EVENT_SCORE_GROUP_FILTER, FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS, FETCH_EVENT_SCORE_GROUP_FILTER_FAILTURE],
  promise: () => API.post(URLConf.cascadeFilter, {id, type: "eventScore"})
});

export const getScore = ({itemId, status}) => ({
  types: [FETCH_EVENT_SCORE, FETCH_EVENT_SCORE_SUCCESS, FETCH_EVENT_SCORE_FAILTURE],
  promise: () => API.post(URLConf.fetchEventScore, {itemId, status})
});

export const setCurrentFilter = (currentFilter) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_EVENT_SCORE_FILTER,
      payload: currentFilter
    })

    dispatch(getScore(currentFilter))
  }
};
// ------------------------------------
// Reducer
// ------------------------------------

function currentFilter(state = {
  status: 0,
  itemId: 0
}, {type, payload}) {
  let s = state;
  if (type === SET_CURRENT_EVENT_SCORE_FILTER) {
    s = payload
  } else if (type === FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS) {
    s.itemId = payload[0].value;
  }

  return s;
}

function filters(state = {
  status: [
    {"text": "全部", "value": 0},
    {"text": "正在进行", "value": 1},
    {"text": "已完成", "value": 2}
  ],
  itemId: []
}, {type, payload}) {
  let s = state;

  if (type === FETCH_EVENT_SCORE_GROUP_FILTER_SUCCESS) {
    s.itemId = payload;
  }

  return s;
}

function score(state = [], {type, payload}) {
  let s = state;
  if (type === FETCH_EVENT_SCORE_SUCCESS) {
    s = payload;
  }
  return s;
}

export default combineReducers({
  currentFilter, filters, score
});
