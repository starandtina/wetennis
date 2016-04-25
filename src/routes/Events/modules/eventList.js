import {createAction, handleActions} from "redux-actions";
import {post} from "store/utils/ajaxAction";

export const GET_EVENT_LIST = "GET_EVENT_LIST";

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

// -----------------------------
// Reducer
// -----------------------------

export default handleActions({
  [GET_EVENT_LIST]: (state, {payload}) => payload
}, []);
