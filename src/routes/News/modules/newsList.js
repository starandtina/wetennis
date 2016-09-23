import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_NEWS_LIST = 'FETCH_NEWS_LIST'
export const FETCH_NEWS_LIST_SUCCESS = 'FETCH_NEWS_LIST_SUCCESS'
export const FETCH_NEWS_LIST_FAILTURE = 'FETCH_NEWS_LIST_FAILTURE'

export const FETCH_NEWS = 'FETCH_NEWS'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_FAILTURE = 'FETCH_NEWS_FAILTURE'


export const SET_PROVIDER_FILTER = 'SET_PROVIDER_FILTER'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchNewsList = (data) => ({
  types: [FETCH_NEWS_LIST, FETCH_NEWS_LIST_SUCCESS, FETCH_NEWS_LIST_FAILTURE],
  promise: () => API.get(URLConf.news, { ...data }),
  meta: { isHideLoadingBar: true }
})

export const setProviderFilter = (filter) => ({
  type: SET_PROVIDER_FILTER,
  payload: filter
})

// -----------------------------
// Reducer
// -----------------------------
export default handleActions({
  [SET_PROVIDER_FILTER]: (state, action) => ({
    ...state,
    providerFilter: action.payload
  }),
  [FETCH_NEWS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload
  })
}, {
  list: [],
  providerFilter: '全部'
})
