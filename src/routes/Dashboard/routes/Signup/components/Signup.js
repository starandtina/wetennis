import React from 'react'
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

export class Signup extends React.Component {

  render () {
    const { children } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavBack caption='注册' style={{color: 'white'}} />
          <SignupFormContainer {...this.props} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Signup
