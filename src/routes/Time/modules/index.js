import { createAction, handleActions } from 'redux-actions'
import API from 'utils/API'
import URL from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_TIME_LIST = 'FETCH_TIME_LIST'
export const FETCH_TIME_LIST_SUCCESS = 'FETCH_TIME_LIST_SUCCESS'
export const FETCH_TIME_LIST_FAILED = 'FETCH_TIME_LIST_FAILED'

export const FETCH_TIME_INFO = 'FETCH_TIME_INFO'
export const FETCH_TIME_INFO_SUCCESS = 'FETCH_TIME_INFO_SUCCESS'
export const FETCH_TIME_INFO_FAILED = 'FETCH_TIME_INFO_FAILED'

export const ADD_TIME_MESSAGE = 'ADD_TIME_MESSAGE'
export const ADD_TIME_MESSAGE_SUCCESS = 'ADD_TIME_MESSAGE_SUCCESS'
export const ADD_TIME_MESSAGE_FAILED = 'ADD_TIME_MESSAGE_FAILED'

export const ADD_IMAGE = 'ADD_IMAGE'
export const addImage = createAction(ADD_IMAGE)

export const CLEAR_TIME_IMAGE = 'CLEAR_TIME_IMAGE'
export const clearTimeImage = createAction(CLEAR_TIME_IMAGE)

export const CLEAR_TIME = 'CLEAR_TIME'
export const clearTime = createAction(CLEAR_TIME)

export const ADD_TIME_MATCH = 'ADD_TIME_MATCH'
export const ADD_TIME_MATCH_SUCCESS = 'ADD_TIME_MATCH_SUCCESS'
export const ADD_TIME_MATCH_FAILED = 'ADD_TIME_MATCH_FAILED'

export const DELETE_TIME = 'DELETE_TIME'
export const DELETE_TIME_SUCCESS = 'DELETE_TIME_SUCCESS'
export const DELETE_TIME_FAILED = 'DELETE_TIME_FAILED'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchTimesList = ({currentPage, id, needLoading}) => {
  return ({
  types: [FETCH_TIME_LIST, FETCH_TIME_LIST_SUCCESS, FETCH_TIME_LIST_FAILED],
  promise: () => API.get(`${URL.times}?currentPage=${currentPage}&id=${id}`),
  meta: { isHideLoadingBar: !needLoading }
})}

export const fetchTimeInfo = data => ({
  types: [FETCH_TIME_INFO, FETCH_TIME_INFO_SUCCESS, FETCH_TIME_INFO_FAILED],
  promise: () => API.post(URL.fetchTimeInfo, data)
})

export const addTimeMessage = data => ({
  types: [ADD_TIME_MESSAGE, ADD_TIME_MESSAGE_SUCCESS, ADD_TIME_MESSAGE_FAILED],
  promise: () => API.post(URL.addTimeMessage, data)
})

export const addTimeMatch = data => ({
  types: [ADD_TIME_MATCH, ADD_TIME_MATCH_SUCCESS, ADD_TIME_MATCH_FAILED],
  promise: () => API.post(URL.addTimeMatch, data)
})

export const fetchDeleteTime = ({ id }) => ({
  types: [DELETE_TIME, DELETE_TIME_SUCCESS, DELETE_TIME_FAILED],
  promise: () => API.delete(`${URL.times}?id=${id}`),
  meta: { id }
})

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [FETCH_TIME_LIST_SUCCESS]: (state, { payload }) => ({
    ...state,
    timeList: payload.timeList.concat(state.timeList),
    currentPage: state.currentPage + 1,
    lastPage: payload.lastPage || false,
  }),
  [CLEAR_TIME]: (state, { payload }) => ({
    ...state,
    timeList: [],
    currentPage: 0,
    lastPage: false,
  }),
  [FETCH_TIME_INFO_SUCCESS]:(state, { payload }) => {
    return ({
      ...state,
      ...payload
    })
  },
  [ADD_IMAGE]:(state, { payload }) => ({
    ...state,
    imageList: state.imageList.concat(payload.imgUrl),
  }),
  [CLEAR_TIME_IMAGE]:(state, { payload }) => ({
    ...state,
    imageList: [],
  }),
  [ADD_TIME_MESSAGE_SUCCESS]:(state, { payload }) => {
    const newTimeList = [payload].concat(state.timeList)
    return ({
      ...state,
      imageList: [],
      timeList: newTimeList
    })
  },
  [ADD_TIME_MATCH_SUCCESS]:(state, { payload }) => {
    const newTimeList = [payload].concat(state.timeList)
    return ({
      ...state,
      imageList: [],
      timeList: newTimeList
    })
  },
  [DELETE_TIME]:(state, { meta: { id } }) => {
    const newTimeList = state.timeList.filter(time => time.id != id)
    return ({
      ...state,
      timeList: newTimeList
    })
  }
}, {
  currentPage: 0,
  lastPage: false,
  timeList: [],
  imageList: []
})

