import { handleActions } from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_NEWS = 'FETCH_NEWS'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_FAILTURE = 'FETCH_NEWS_FAILTURE'


// ------------------------------------
// Actions
// ------------------------------------
export const fetchNews = (data) => ({
  types: [FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILTURE],
  promise: () => API.post(URLConf.fetchNews, { ...data })
})

// -----------------------------
// Reducer
// -----------------------------
export default handleActions({
  [FETCH_NEWS]: (state, action) => ({
    ...state
  }),
  [FETCH_NEWS_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [FETCH_NEWS_FAILTURE]: (state, action) => ({
    ...state
  })
}, { list: [] })
