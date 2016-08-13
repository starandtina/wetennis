import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_NEWS = 'FETCH_NEWS'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_FAILTURE = 'FETCH_NEWS_FAILTURE'

export const FETCH_NEWS_COMMENTS = 'FETCH_NEWS_COMMENTS'
export const FETCH_NEWS_COMMENTS_SUCCESS = 'FETCH_NEWS_COMMENTS_SUCCESS'
export const FETCH_NEWS_COMMENTS_FAILTURE = 'FETCH_NEWS_COMMENTS_FAILTURE'

export const LIKE_COMMENT = 'LIKE_COMMENT'
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS'
export const LIKE_COMMENT_FAILTURE = 'LIKE_COMMENT_FAILTURE'


export const SAVE_COMMENT = 'SAVE_COMMENT'
export const SAVE_COMMENT_SUCCESS = 'SAVE_COMMENT_SUCCESS'
export const SAVE_COMMENT_FAILTURE = 'SAVE_COMMENT_FAILTURE'


// ------------------------------------
// Actions
// ------------------------------------
export const fetchNews = (data) => ({
  types: [FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILTURE],
  promise: () => API.post(URLConf.fetchNews, { ...data })
})

export const fetchNewsComments = (data) => ({
  types: [FETCH_NEWS_COMMENTS, FETCH_NEWS_COMMENTS_SUCCESS, FETCH_NEWS_COMMENTS_FAILTURE],
  promise: () => API.post(URLConf.fetchNewsComments, { ...data })
})

export const likeComment = (data) => ({
  types: [LIKE_COMMENT, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_FAILTURE],
  promise: () => API.post(URLConf.likeNewsComment, { ...data })
})

export const saveComment = (data) => ({
  types: [SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_FAILTURE],
  promise: () => API.post(URLConf.saveNewsComment, { ...data })
})


// -----------------------------
// Reducer
// -----------------------------
const news = handleActions({
  [FETCH_NEWS]: (state, action) => ({
    ...state
  }),
  [FETCH_NEWS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [FETCH_NEWS_FAILTURE]: (state, action) => ({
    ...state
  })
}, {})

const comments = handleActions({
  [FETCH_NEWS_COMMENTS]: (state, action) => ({
    ...state
  }),
  [FETCH_NEWS_COMMENTS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [FETCH_NEWS_COMMENTS_FAILTURE]: (state, action) => ({
    ...state
  })
}, {
  total: 0,
  comments: []
})


export default combineReducers({
  news,
  comments
})
