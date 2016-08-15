import { handleActions } from 'redux-actions';
import { FETCH_MY_TIMES_SUCCESS } from './actions';
import concat from 'lodash/concat';

export default handleActions({
  [FETCH_MY_TIMES_SUCCESS]: (times, payload) => concat(payload)(times)
}, {})
