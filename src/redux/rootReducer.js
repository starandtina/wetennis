import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import activeNavTab from './modules/activeNavTab';
import latestNews from './modules/latestNews';
import eventsList from './modules/eventsList';

export default combineReducers({
  activeNavTab,
  latestNews,
  eventsList,
  router,
  form: formReducer
});
