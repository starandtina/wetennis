import React from 'react'

import NavBack from 'components/NavBack'
import VerifyPhoneFormContainer from '../containers/VerifyPhoneFormContainer'
import classes from './VerifyPhone.scss'

export class Sign extends React.Component {

  render () {
    document.querySelector('body').style.backgroundColor = '#1cca5a'

    return (
      <div>
        <NavBack caption='验证手机' style={{color: 'white'}} />
        <VerifyPhoneFormContainer {...this.props} />
      </div>
    )
  }
}

export default Sign
