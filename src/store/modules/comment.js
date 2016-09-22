import URLConf from "utils/url";
import API from "utils/API";
import {handleActions} from "redux-actions";

// ------------------------------------
// Constants
// ------------------------------------

const PREFIX = "COMMENT_ACTION_";

export const GET_COMMENT = `${PREFIX}GET_COMMENT`;
export const GET_COMMENT_SUCCESS = `${PREFIX}GET_COMMENT_SUCCESS`;
export const GET_COMMENT_FAILTURE = `${PREFIX}GET_COMMENT_FAILTURE`;

export const SEND_COMMENT = `${PREFIX}SEND_COMMENT`;
export const SEND_COMMENT_SUCCESS = `${PREFIX}SEND_COMMENT_SUCCESS`;
export const SEND_COMMENT_FAILTURE = `${PREFIX}SEND_COMMENT_FAILTURE`;

export const LIKE_COMMENT = `${PREFIX}LIKE_COMMENT`;
export const LIKE_COMMENT_SUCCESS = `${PREFIX}LIKE_COMMENT_SUCCESS`;
export const LIKE_COMMENT_FAILTURE = `${PREFIX}LIKE_COMMENT_FAILTURE`;

export const CLEAN_COMMENT = `${PREFIX}CLEAN_COMMENT`;

// ------------------------------------
// Actions
// ------------------------------------

export function getComments (userId, type, id) {
  return {
    types: [GET_COMMENT, GET_COMMENT_SUCCESS, GET_COMMENT_FAILTURE],
    promise: () => API.post(URLConf.fetchComments, {type, id, userId})
  }
}

export function sendComment (userId, type, id, content) {
  return dispatch => {
    dispatch({
      types: [SEND_COMMENT, SEND_COMMENT_SUCCESS, SEND_COMMENT_FAILTURE],
      promise: () => API.post(URLConf.sendComment, {type, id, content, userId})
    }).then(() => {
      dispatch(getComments(userId, type, id))
    })
  }
}

export function likeComment (userId, type, id) {
  return dispatch => {
    dispatch({
      types: [LIKE_COMMENT, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_FAILTURE],
      promise: () => API.post(URLConf.likeComment, {id, type, userId})
    }).then(() => {
      dispatch(getComments(type, id))
    })
  }
}

export function resetComment() {
  return {
    type: CLEAN_COMMENT
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [GET_COMMENT_SUCCESS]: (state, {payload}) => ({...payload}),
  [CLEAN_COMMENT]: () => ({total: 0, comments: []})
}, {total: 0, comments: []})
