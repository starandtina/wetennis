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


// ------------------------------------
// Reducer
// ------------------------------------

