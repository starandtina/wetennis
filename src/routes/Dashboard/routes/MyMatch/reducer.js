import { handleActions } from 'redux-actions';
import {
  FETCH_MY_MATCH,
  FETCH_MY_MATCH_SUCCESS,
  FETCH_MY_PRACTICE,
  FETCH_MY_PRACTICE_SUCCESS
} from './actions';

const matchReducer = handleActions({
  [FETCH_MY_MATCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    matchData: payload
  }),
  [FETCH_MY_PRACTICE_SUCCESS]: (state, { payload }) => ({
    ...state,
    practiceData: payload
  })
}, {
  matchData: {},
  practiceData: {}
})
export default matchReducer;

