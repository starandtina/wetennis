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


// ------------------------------------
// Actions
// ------------------------------------
export const fetchNews = (data) => ({
  types: [FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILTURE],
  promise: () => API.get(`${URLConf.fetchNews}/${data.id}`, { ...data })
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
}, {
  "id": 1,
  "title": "瓦林卡状态越来越好 力争在迪拜首次问鼎",
  "date": "2016 年04月15日 23: 42: 18",
  "thumbImgUrl": "http://img2.3lian.com/2014/f6/173/d/51.jpg",
  "content": "",
  "keywordList": ["体育"],
  "likeCount": 0,
  "commentCount": 0,
  "provider": "SINA",
  "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
})

export default combineReducers({
  news
})
