import React, { PureComponent } from 'react'
import NavBack from 'components/NavBack'

import TeamMemberView from 'routes/Events/routes/Team/routes/Register/components/TeamMemberView'
import cs from './RegisteredTeams.scss'

export default class RegisteredTeams extends PureComponent  {
  componentDidMount() {
    const { fetchRegisteredTeams, params: { eventId } } = this.props
    
    fetchRegisteredTeams(eventId)
  }
  render() {
    const { registeredTeams = [], params: { eventId } } = this.props

    return (
      <div className='u-has-nav container'>
        <NavBack routes={this.props.routes} title='团队赛事报名列表' transparent />
        {registeredTeams.map(t => (
          <div key={t.registerDate}>
            <div className='well'>
              <p><strong>组别</strong>: {t.groupName}</p>
              <p><strong>团队名称</strong>: {t.name}</p>
              <p><strong>教练名字</strong>: {t.coachName}</p>
            </div>
            {t.members && t.members.map(m => (
              <div className={`${cs['team-member-view']} clearfix`}>
                <TeamMemberView key={m.id} {...m} suppressActions />
              </div>
            ))}
            <hr />
          </div>
        ))}
      </div>
    )
  }
}
