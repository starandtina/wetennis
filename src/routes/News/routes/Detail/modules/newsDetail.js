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
  promise: () => API.post(URLConf.fetchNews, { ...data })
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
  "content": "阿联酋当地时间周五，ATP迪拜站展开男单半决赛的争夺，瓦林卡在6-4、3-0的领先的情况下，由于克耶高斯的退赛而率先挺进男单决赛。今天瓦林卡将会向本赛季的第二个巡回赛冠军发起冲击。\"如果你回顾本周的早些时候， 我的发挥可能并不是这么完美。\" 瓦林卡在迪拜首场比赛中仅差两分就遭到斯塔霍夫斯基的淘汰：\" 但此后， 我的状态不断提升， 虽然比赛还有一些挣扎， 但是我总是保持战斗的状态， 并尝试找到致胜的法宝， 所以后面的比赛打得更好一些。这是30岁的瓦林卡， 时隔多年重返迪拜参赛。 他在2006年和2008年为数不多的两次参赛中， 均是在首轮被打道回府。作为两届大满贯的得主， 瓦林卡将会在今天向冠军发起冲击， 如果获胜他将收获生涯第13个巡回赛头衔。 在今年的早些时候， 瑞士人在清奈站中击败了丘里奇获胜了赛季首冠。 目前， 瓦林卡已经取得了巡回赛决赛的八连胜， 生涯巡回赛决赛的总战绩为12胜9负。因伤退赛的克耶高斯， 则在本周延续了自己的强势发挥， 上周他刚刚在马赛站中击败了西里奇， 拿下了生涯的首个冠军。 在谈到自己的退赛原因时， 克耶高斯说：\" 我的今天几乎无法发全力发球， 而且瓦林卡的发挥非常好， 尤其是发球以及第三板的进攻。 ",
  "keywordList": ["ATP", "男子单打"],
  "likeCount": 999,
  "commentCount": 999,
  "provider": "SINA",
  "providerIconUrl": "http://www.sina.com.cn/favicon.ico"
})

export default combineReducers({
  news
})
