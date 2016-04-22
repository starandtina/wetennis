import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux/middlewares/thunk'
import promiseMiddleware from 'redux-promise'
import errorMiddleware from 'redux/middlewares/error'
import ajaxValidate from "redux/middlewares/ajaxValidate";
import callbackMiddleware from "redux/middlewares/callback";
import rootReducer from './rootReducer'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore (initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(
    thunk,
    ajaxValidate,
    promiseMiddleware,
    callbackMiddleware,
    errorMiddleware,
    routerMiddleware(history)
  );
  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').instrument()
    middleware = compose(middleware, devTools)
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
