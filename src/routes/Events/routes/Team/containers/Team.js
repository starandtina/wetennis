import React, {
  PureComponent
} from 'react'

export default class TeamRegisterContainer extends PureComponent {
  render() {
    const {
      children
    } = this.props

    let content = <div className='u-has-nav'><h1>Team</h1></div>

    if (children) {
      content = children
    }

    return <div>
      {content}
    </div>
  }
}
