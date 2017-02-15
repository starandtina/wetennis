import React, { PureComponent } from 'react'
import NavBack from 'components/NavBack'

import RegisteredUsers from 'routes/Events/routes/Register/components/RegisteredUsers'

export default class RegisteredMembers extends  PureComponent  {
  componentDidMount() {
    const { fetchRegisteredMembers, params: { eventId } } = this.props
    
    fetchRegisteredMembers(eventId)
  }
  render() {
    const { registeredMembers } = this.props

    return (
      <div className='u-has-nav container'>
        <NavBack routes={this.props.routes} title='赛事报名列表' transparent />
        <RegisteredUsers registeredUsers={registeredMembers} />
      </div>
    )
  }
}
