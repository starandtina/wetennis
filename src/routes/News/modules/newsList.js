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
  promise: () => API.post(URLConf.fetchNewsList, { ...data }),
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
  [FETCH_NEWS_LIST]: (state, action) => ({
    ...state
  }),
  [FETCH_NEWS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [FETCH_NEWS_LIST_FAILTURE]: (state, action) => ({
    ...state
  })
}, {
  list: [
    {
      "id": 1,
      "title": "瓦林卡状态越来越好 力争在迪拜首次问鼎",
      "date": "2016 年04月15日 23: 42: 18",
      "thumbImgUrl": "http://img2.3lian.com/2014/f6/173/d/51.jpg",
      "likeCount": 999,
      "commentCount": 999,
      "provider": "SINA",
      "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
      },
    {
      "id": 2,
      "title": "我来自ATP官网",
      "date": "2016 年04月15日 23: 42: 18",
      "thumbImgUrl": "http://img2.3lian.com/2014/f6/173/d/52.jpg",
      "likeCount": 999,
      "commentCount": 999,
      "provider": "ATP官网",
      "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
      },
    {
      "id": 3,
      "title": "我来自新浪",
      "date": "2016 年04月15日 23: 42: 18",
      "thumbImgUrl": "http://img2.3lian.com/2014/f6/173/d/53.jpg",
      "likeCount": 999,
      "commentCount": 999,
      "provider": "SINA",
      "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
      }
    ],
  providerFilter: '全部'
})
