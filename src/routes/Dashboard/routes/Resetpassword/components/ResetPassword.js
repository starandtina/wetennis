import React, { Component } from 'react'

import NavBack from 'components/NavBack'
import ResetPasswordFormContainer from '../containers/ResetPasswordFormContainer'

class ResetPassword extends Component {
  render () {
    let content = (
        <div>
          <ResetPasswordFormContainer {...this.props} />
        </div>
      )
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default ResetPassword
