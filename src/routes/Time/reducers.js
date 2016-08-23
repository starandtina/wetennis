import { handleActions } from 'redux-actions';
import {
  FETCH_TIME_SUCCESS,
  FETCH_TIME_INFO_SUCCESS,
  UPLOAD_TIME_IMAGE_SUCCESS,
  CLEAR_TIME_IMAGE,
  ADD_TIME_MESSAGE_SUCCESS,
  ADD_TIME_MATCH_SUCCESS,
  DELETE_TIME
} from './actions';

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
  },
  [UPLOAD_TIME_IMAGE_SUCCESS]:(state, { payload }) => {
    //console.log(state);
    console.log(payload);
    const imageList = state.imageList.concat(payload.ImageUrl);
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
