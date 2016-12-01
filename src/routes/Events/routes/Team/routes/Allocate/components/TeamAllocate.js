import React, { PureComponent } from 'react'

import NavBack from 'components/NavBack'

import TeamMemberView from './TeamMemberView'

export default class TeamAllocate extends PureComponent {
  componentDidMount() {
    const { fetchRegisteredTeamMembers } = this.props

    fetchRegisteredTeamMembers({userId: ''})
  }

  allocateTeamMembers = () => {

  }

  render() {
    const { registeredTeamMembers } = this.props

    return <div className='u-has-nav'>
      <NavBack routes={this.props.routes} caption='出战顺序' handleGoBack={() => push(`/events/${eventId}`)}>
        <div onClick={this.allocateTeamMembers}>
          <i className={`material-icons`}>done</i>
        </div>
      </NavBack>
      <div>
        {registeredTeamMembers.map( m => {
          return <TeamMemberView key={m.id} {...m} />
        })}
      </div>
    </div>
  }
}
