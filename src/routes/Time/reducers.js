import { handleActions } from 'redux-actions';
import {
  FETCH_TIME_LIST_SUCCESS,
  FETCH_TIME_INFO_SUCCESS,
  UPLOAD_TIME_IMAGE,
  CLEAR_TIME_IMAGE,
  ADD_TIME_MESSAGE_SUCCESS,
  ADD_TIME_MATCH_SUCCESS,
  DELETE_TIME
} from './actions';

export default handleActions({
  [FETCH_TIME_LIST_SUCCESS]: (state, { payload }) => {
    return ({
      ...state,
      timeList: payload.timeList.concat(state.timeList),
      currentPage: state.currentPage + 1,
      lastPage: payload.lastPage || false
    });
  },
  [FETCH_TIME_INFO_SUCCESS]:(state, { payload }) => {
    return ({
      ...state,
      ...payload
    });
  },
  [UPLOAD_TIME_IMAGE]:(state, { payload }) => {
    const imageList = state.imageList.concat(payload.imgstr);
    return ({
      ...state,
      imageList
    });
  },
  [CLEAR_TIME_IMAGE]:(state, { payload }) => {
    return ({
      ...state,
      imageList: []
    });
  },
  [ADD_TIME_MESSAGE_SUCCESS]:(state, { payload }) => {
    return ({
      ...state,
      imageList: []
    });
  },
  [ADD_TIME_MATCH_SUCCESS]:(state, { payload }) => {
    return ({
      ...state,
      imageList: []
    });
  },
  [DELETE_TIME]:(state, { payload: { id } }) => {
    const newTimeList = state.timeList.filter(time => time.id != id);
    return ({
      ...state,
      timeList: newTimeList
    });
  }
}, {
  currentPage: 0,
  lastPage: false,
  timeList: [],
  imageList: []
})
