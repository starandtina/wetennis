import React from 'react'
import { white } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import classes from './Sign.scss'

import SignBackgroundImage from '../assets/signin_background.png'
import SigninFormContainer from '../containers/SigninFormContainer'

const muiTheme = getMuiTheme({
  palette: {
    textColor: white
  }
})

export class Sign extends React.Component {

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <img src={SignBackgroundImage} className={classes['signin-background']} />
          <div className={classes['form-container']}>
            <div className={classes['text']}>
              <p>WE</p>
              <p>TENNIS</p>
            </div>
            <SigninFormContainer {...this.props} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Sign
