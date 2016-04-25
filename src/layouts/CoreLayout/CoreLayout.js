import React from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import classes from './CoreLayout.scss'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className='page-container'>
      <div className='wetennis'>
        <Header/>
        <div className='wetennis-body'>
          {children}
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
