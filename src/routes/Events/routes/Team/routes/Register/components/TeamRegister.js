import React, { PureComponent } from 'react'

import NavBack from 'components/NavBack'

export default class TeamRegisterContainer extends PureComponent {
  render() {
    return <div className='u-hasNav'>
      <NavBack routes={this.props.routes} caption='报名' />
      <h1>header</h1>
    </div>
  }
}
