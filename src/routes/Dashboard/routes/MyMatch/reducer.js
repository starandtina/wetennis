import { handleActions } from 'redux-actions';
import { FETCH_MY_MATCH, FETCH_MY_MATCH_SUCCESS } from './actions';

const matchReducer = handleActions({
  [FETCH_MY_MATCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload
  })
}, {})
export default matchReducer;

