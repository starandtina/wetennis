import React, { Component } from 'react'

import NavBack from 'components/NavBack'
import SignupFormContainer from '../containers/SignupFormContainer'

export class Signup extends Component {
  render () {
    const { children } = this.props
    let content = children

    if (!children) {
      content = (
        <div>
          <NavBack caption='注册' style={{color: 'white'}} />
          <SignupFormContainer {...this.props} />
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Signup
