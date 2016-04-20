import { createAction, handleActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'

// Constants
// ------------------------------------
export const FETCH_LATEST_NEWS = 'FETCH_LATEST_NEWS'

const initState = [
  {
    "ID": "114",
    "TYPE": "Pro",
    "TITLE": "中国男网前一哥张择再出发 坦言奥运有点遥远",
    "ISSUETIME": "2016-3-17 10:57:22",
    "WRITER": "网易",
    "SMALLURL": "http://wetennis.cn:86/upload/d69c556b-070e-446e-b4dc-11c0607e1683.jpg",
    "IMGURL": "http://wetennis.cn:86/upload/d69c556b-070e-446e-b4dc-11c0607e1683.jpg",
    "STATUS": "0",
    "FORURL": "",
    "EXT1": "",
    "EXT2": "",
    "EXT3": "",
    "SYSNO": "7C9C4720E24242B88C73DDAACB7DE3ED"
  },
  {
    "ID": "113",
    "TYPE": "Pro",
    "TITLE": "巴黎银行赛瓦林卡不敌戈芬 无缘8强",
    "ISSUETIME": "2016-3-17 10:54:57",
    "WRITER": "网易",
    "SMALLURL": "http://wetennis.cn:86/upload/e9c08ef6-b06b-44e3-b035-8f9e70d7150b.jpg",
    "IMGURL": "http://wetennis.cn:86/upload/e9c08ef6-b06b-44e3-b035-8f9e70d7150b.jpg",
    "STATUS": "0",
    "FORURL": "",
    "EXT1": "",
    "EXT2": "",
    "EXT3": "",
    "SYSNO": "E79B13508CA1457C9F22A485EB2D9066"
  },
  {
    "ID": "112",
    "TYPE": "Pro",
    "TITLE": "巴黎银行赛拉德轻取扬科维奇 进八强将战科维托娃",
    "ISSUETIME": "2016-3-17 10:45:04",
    "WRITER": "新浪",
    "SMALLURL": "http://wetennis.cn:86/upload/71ba8f4b-b6be-4b47-8ed8-f8f15d2b2d8d.jpg",
    "IMGURL": "http://wetennis.cn:86/upload/71ba8f4b-b6be-4b47-8ed8-f8f15d2b2d8d.jpg",
    "STATUS": "0",
    "FORURL": "",
    "EXT1": "",
    "EXT2": "",
    "EXT3": "",
    "SYSNO": "FB9BE0A47B134CFFBD9EBCEA6BC46DDB"
  }
];

// ------------------------------------
// Actions
// ------------------------------------
export const fetchLatestNews = createAction(FETCH_LATEST_NEWS, (args) => {
  return dispatch => {
    dispatch(
      post(FETCH_LATEST_NEWS, { url: '/WebService/WeNews.ashx' })
    )
  }
})

const loading = createAction('LOADING');

const get = createAction('get', (type, opts) => {
  return dispatch => {
    dispatch(loading())
    dispatch({
      type,
      payload: fetch(opts.url).then(response => response.json())
    })
  }
})

const post = createAction('post', (type, opts) => {
  return dispatch => {
    dispatch(loading())
    dispatch({
      type,
      payload: fetch(opts.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method: 'fetchNews'
        })
      }).then(response => response.json())
    })
  }
})


export const actions = {
  fetchLatestNews
}

// ------------------------------------
// Reducer
// ------------------------------------
const reducer = handleActions({
  LOADING: (state, action) => {
    return state
  },
  [FETCH_LATEST_NEWS]: (state, action) => action.payload.data
}, initState)

export default reducer
