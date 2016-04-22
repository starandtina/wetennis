import { createAction, handleActions } from 'redux-actions'
import {post} from '../utils/ajaxAction';

// Constants
// ------------------------------------
export const GET_EVENTS_LIST = 'GET_EVENTS_LIST';

// ------------------------------------
// Actions
// ------------------------------------
export const getEventsList = createAction(GET_EVENTS_LIST, _ => {
  return dispatch => {
    dispatch(post(GET_EVENTS_LIST, {
      url: '/events',
      data: {
            "method": "fetchEvents",
            "status": "ALL/REGISTERING/ASSIGN_DRAW/IN_PROGRESS/DONE",
            "eventFilter": "ALL/RECOMMENDATION/ME",
            "locationFilter": "CHENGDU/DEYANG/...",
            "currentPage": 6,
            "limit": 30
        }
      
    }));
  }
});

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_EVENTS_LIST]: (state, _) => {
    debugger
    return _.payload;
  }
}, []);
