import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import activeNavTab from './modules/activeNavTab'
import latestNews from './modules/latestNews'

export default combineReducers({
  activeNavTab,
  latestNews,
  router
})
