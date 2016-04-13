import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import latestNews from './modules/latestNews'

export default combineReducers({
  counter,
  latestNews,
  router
})
