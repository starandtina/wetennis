import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import systemReducer from 'store/modules'

export const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    system: systemReducer,
    router,
    form: formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Reflect.has(store.asyncReducers, key)) return
  
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
