import {
  handleActions
} from 'redux-actions'

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
  promise: () => API.post(URLConf.fetchNewsList, {...data
  })
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
      "date": "2017 年04月15日 23: 42: 18",
      "thumbImgUrl": "http://hbimg.b0.upaiyun.com/02d7023e92a7227116fad577b50fbcdf0aab4e4ead0bb-lryBLC_fw658",
      "likeCount": 999,
      "commentCount": 999,
      "provider": "SINA",
      "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
      },
    {
      "id": 2,
      "title": "我来自ATP官网",
      "date": "2016 年04月15日 23: 42: 18",
      "thumbImgUrl": "https://placeholdit.imgix.net/~text?txtsize=12&txt=128%C3%97256&w=128&h=256",
      "likeCount": 999,
      "commentCount": 999,
      "provider": "ATP官网",
      "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
      },
    {
      "id": 3,
      "title": "我来自新浪",
      "date": "2016 年04月15日 23: 42: 18",
      "thumbImgUrl": "https://placeholdit.imgix.net/~text?txtsize=12&txt=1280%C3%97256&w=1280&h=256",
      "likeCount": 999,
      "commentCount": 999,
      "provider": "SINA",
      "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
      }
    ],
  providerFilter: '全部'
})
