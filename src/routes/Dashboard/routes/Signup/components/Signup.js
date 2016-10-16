import React, { Component } from 'react'
import { white } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import NavBack from 'components/NavBack'
import SignupFormContainer from '../containers/SignupFormContainer'

const muiTheme = getMuiTheme({
  palette: {
    textColor: white
  }
})

export class Signup extends Component {
  componentWillUnmount() {
    this.props.resetSignupUser()
  }

  render () {
    const { children } = this.props
    let content = children

    if (!children) {
      content = (
        <div className='u-hasNav container'>
          <NavBack caption='注册' style={{color: 'white'}} />
          <SignupFormContainer {...this.props} />
        </div>
      )
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {content}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Signup
