import {createAction, handleActions} from "redux-actions";
import {post} from "store/utils/ajaxAction";

export const GET_EVENT_LIST = "GET_EVENT_LIST";
export const GET_EVENT_FILTER = "GET_EVENT_FILTER";

// -----------------------------
// Action
// -----------------------------

export const getEventList = createAction(GET_EVENT_LIST, (param) => {

  return dispatch => {
    dispatch(post(GET_EVENT_LIST, {
      url: "/events",
      data: {
        "method": "fetchEvents",
        ...param
      }
    }));
  }
});

export const getFilter = createAction(GET_EVENT_FILTER, _ => {
  return dispatch => {
    dispatch(post(GET_EVENT_FILTER, {
      url: "/eventFilter",
      data: {
        method: "fetchEventFilter"
      }
    }))
  }
});

// -----------------------------
// Reducer
// -----------------------------

export const list = handleActions({
  [GET_EVENT_LIST]: (state, {payload}) => payload
}, []);

export const locationFilter = handleActions({
  [GET_EVENT_FILTER]: (_, {payload}) => payload.locationFilter
}, []);
