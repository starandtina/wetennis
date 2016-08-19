import { handleActions } from 'redux-actions';
import { FETCH_TIME_SUCCESS, FETCH_TIME_INFO_SUCCESS } from './actions';

export default handleActions({
  [FETCH_TIME_SUCCESS]: (state, { payload }) => {
    //console.log(state);
    //console.log(payload);
    return ({
      ...state,
      timeList: payload.timeList.concat(state.timeList),
      currentPage: state.currentPage + 1,
      lastPage: payload.lastPage || false
    });
  },
  [FETCH_TIME_INFO_SUCCESS]:(state, { payload }) => {
    //console.log(state);
    //console.log(payload);
    return ({
      ...state,
      ...payload
    });
  }
}, {
  currentPage: 0,
  lastPage: false,
  timeList: []
})
