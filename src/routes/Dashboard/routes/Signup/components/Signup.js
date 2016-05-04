import React from 'react'

import NavBack from 'components/NavBack'
import SignupFormContainer from '../containers/SignupFormContainer'

export class Signup extends React.Component {

  render () {
    document.querySelector('body').classList.add('u-backgroundColorGreen')
    const { children } = this.props

    return (
      <div>
        <NavBack caption='注册' style={{color: 'white'}} />
        <SignupFormContainer {...this.props} />
      </div>
    )
  }
}

export default Signup
