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

export const likeComment = (id, commentId) => ({
  types: [LIKE_COMMENT, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_FAILTURE],
  promise: () => API.post(URLConf.likeNewsComment, {
    id,
    commentId
  }),
  commentId
})

export const saveComment = (id, text) => ({
  types: [SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_FAILTURE],
  promise: () => API.post(URLConf.saveNewsComment, {
    id,
    context: text
  })
})

export const saveCommentThenFetchComments = (id, text) => {
  return dispatch => {
    dispatch(saveComment(id, text))
      .then(resp => {
        dispatch(fetchNewsComments({
          id
        }))
      })
  }
}

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
  }),
  [LIKE_COMMENT_SUCCESS]: (state, action) => {
    const {
      commentId
    } = action

    return Object.assign({}, state, {
      comments: state.comments.map((comment) => {
        if (String(comment.id) === String(commentId)) {
          return Object.assign({}, comment, {
            like: true,
            likeNumber: ++comment.likeNumber
          })
        }

        return comment
      })
    })
  },
}, {
  total: 2000,
  comments: [
      {
        "id": 1,
        "username": "用户名1",
        "userimage": "http://hbimg.b0.upaiyun.com/65ad7509d8f8ea45beb7589cca3c557d02f15ac0e9e82-QDUx6P_sq120",
        "time": "1小时前",
        "context": "国际在线消息（记者 刘榕）：由泰国记者协会会长万猜·翁米猜率领的泰国记者协会代表团一行由中国记者协会国际联络部副主任马玉安陪同１９日前往天津参观访问。",
        "like": false,
        "likeNumber": 999
      },
      {
        "id": 2,
        "username": "用户名2",
        "userimage": "http://hbimg.b0.upaiyun.com/65ad7509d8f8ea45beb7589cca3c557d02f15ac0e9e82-QDUx6P_sq120",
        "time": "2小时前",
        "context": "国际在线消息（记者 刘榕）：由泰国记者协会会长万猜·翁米猜率领的泰国记者协会代表团一行由中国记者协会国际联络部副主任马玉安陪同１９日前往天津参观访问。",
        "like": false,
        "likeNumber": 999
      },
      {
        "id": 3,
        "username": "用户名3",
        "userimage": "http://hbimg.b0.upaiyun.com/65ad7509d8f8ea45beb7589cca3c557d02f15ac0e9e82-QDUx6P_sq120",
        "time": "3小时前",
        "context": "国际在线消息（记者 刘榕）：由泰国记者协会会长万猜·翁米猜率领的泰国记者协会代表团一行由中国记者协会国际联络部副主任马玉安陪同１９日前往天津参观访问。",
        "like": true,
        "likeNumber": 999
      }
    ]
})


export default combineReducers({
  news,
  comments
})
