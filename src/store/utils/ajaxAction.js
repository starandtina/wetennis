import {createAction, handleActions} from "redux-actions";
import 'isomorphic-fetch';

function isObject(v) {
  return toString.call(v).toLowerCase() === "[object object]";
}

function __post(url, data) {
  data = data || {};
  if (!isObject(data)) return;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

const POST = "__POST__";
const LOADING = "__LOADING__";
const LOADED = "__LOADED__";

let PREURL = "http://wetennis.cn:83/WebService";
if (__DEV__) {
  PREURL = "/api";
}

export const loading = createAction(LOADING);
export const loaded = createAction(LOADED);

export const post = createAction(POST, (type, _) => {
  return dispatch => {
    dispatch(loading());
    dispatch({
      type,
      meta: {
        isAjax: true,
        callback: _.callback
      },
      payload: __post(`${PREURL}${_.url}`, _.data)
    });
  }
});
