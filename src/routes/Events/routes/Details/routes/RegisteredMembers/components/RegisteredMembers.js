import React, { PureComponent } from 'react'
import NavBack from 'components/NavBack'

import RegisteredUsers from 'routes/Events/routes/Register/components/RegisteredUsers'

export default class RegisteredMembers extends  PureComponent  {
  componentDidMount() {
    const { fetchRegisteredMembers, params: { eventId } } = this.props
    
    fetchRegisteredMembers(eventId)
  }
  render() {
    const { registeredMembers = [], params: { eventId } } = this.props
    const groupedRegisteredMembers = registeredMembers.reduce((r, m) => {
      const key = `${m.groupName} - ${m.itemName}`
      
      r[key] = r[key] ? [...r[key], m] : [m]
      
      return r
    }, {})

    return (
      <div className='u-has-nav container'>
        <NavBack routes={this.props.routes} title='赛事报名列表' transparent />
        {Object.keys(groupedRegisteredMembers).map(k => (
          <div key={k}>
            <div className='well'>{k}({groupedRegisteredMembers[k].length})</div>
            <RegisteredUsers eventId={eventId} registeredUsers={groupedRegisteredMembers[k]} />
          </div>
        ))}
      </div>
    )
  }
}
