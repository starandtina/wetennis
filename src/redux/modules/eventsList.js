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
        'method': 'events'
      }
    }));
  }
});

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_EVENTS_LIST]: (state, _) => {
    return _.payload;
  }
}, []);
