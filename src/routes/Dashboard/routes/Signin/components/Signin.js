import React from 'react'

import classes from './Sign.scss'
import SignBackgroundImage from '../assets/signin_background.png'
import SigninFormContainer from '../containers/SigninFormContainer'

export class Sign extends React.Component {

  render () {
    return (
      <div>
        <img src={SignBackgroundImage} className={classes['signin-background']} />
        <div className={classes['form-container']}>
          <div className={classes['text']}>
            <p>WE</p>
            <p>TENNIS</p>
          </div>
          <SigninFormContainer />
        </div>
      </div>
    )
  }
}

export default Sign
