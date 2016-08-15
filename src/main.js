import 'babel-polyfill'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import { Provider } from 'react-redux'
import createRoutes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LoadingBar from 'components/LoadingBar'
import ErrorMessage from 'components/ErrorMessage'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const MOUNT_ELEMENT = document.getElementById('root')

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const store = createStore(window.__INITIAL_STATE__, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

class Root extends Component {
  render() {
    const { routes, system } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
          {system.isLoading ? <LoadingBar /> : undefined }
          {system.error
          ? <ErrorMessage data={system.error} />
          : undefined}
        </div>
      </MuiThemeProvider>
    )
  }
}

let render = (key = null) => {
  const routes = createRoutes(store)
  const ConnectedRoot = connect((state) => ({ system: state.system }), null)(Root)
  const App = (
    <Provider store={store}>
      <ConnectedRoot routes={routes} />
    </Provider>
  )
  ReactDOM.render(App, MOUNT_ELEMENT)
}


// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error}/>, MOUNT_ELEMENT)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// Use Redux DevTools chrome extension
if (__DEBUG__) {
  if (window.devToolsExtension) window.devToolsExtension.open()
}

render()
