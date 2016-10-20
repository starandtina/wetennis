import React, { Component } from 'react'
import { white } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import NavBack from 'components/NavBack'
import ResetPasswordFormContainer from '../containers/ResetPasswordFormContainer'

const muiTheme = getMuiTheme({
  palette: {
    textColor: white
  }
})

class ResetPassword extends Component {
  render() {
    let content = (
      <div className='u-hasNav container'>
        <NavBack caption='重置密码' transparent={false} className='white-theme' />
        <ResetPasswordFormContainer {...this.props} />
      </div>
    )

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {content}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ResetPassword
