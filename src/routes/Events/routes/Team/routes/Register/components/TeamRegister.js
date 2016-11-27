import React, { PureComponent } from 'react'
import uuid from 'uuid'

import NavBack from 'components/NavBack'
import TeamRegisterFormContainer from '../containers/TeamRegisterForm'
import TeamMemberFormContainer from '../containers/TeamMemberForm'
import TeamMemberView from './TeamMemberView'

import cs from './TeamRegister.scss'

export default class TeamRegisterContainer extends PureComponent {
  componentDidMount() {
    document.body.classList.add(cs['body-backgroundColor'])

    const { fetchEventGroups, params: { eventId } } = this.props

    fetchEventGroups({eventId})
  }

  componentWillUnmount() {
    document.body.classList.remove(cs['body-backgroundColor'])
  }

  handleSubmitTeamMemberForm = (values) => {
    const { saveTeamMember, currentEditingTeamMember } = this.props
    const { identify, idNumber } = values

    saveTeamMember({
      ...values,
      [identify]: idNumber,
      id: currentEditingTeamMember && currentEditingTeamMember.id ||　uuid()
    })
  }

  render() {
    const { editing, startAddTeamMember, cancelEditTeamMember, members } = this.props

    return <div className={`${cs['team-register-container']} u-hasNav`}>
      <NavBack routes={this.props.routes} caption='团体报名'>
        <div onClick={startAddTeamMember}>
          <i className={`${cs['add-team-member-icon']} material-icons`}>add</i><i className={`${cs['add-team-member-icon']} material-icons`}>people</i>
        </div>
      </NavBack>
      <div className='container'>
        <TeamRegisterFormContainer {...this.props} />
        <p className='text-muted'>队员</p>
        {Object.keys(members).map( k => {
          return members[k] && <TeamMemberView key={k} id={k} {...members[k]} {...this.props} />
        })}
        { editing && 
          <TeamMemberFormContainer {...this.props}
            onCancel={cancelEditTeamMember}
            onSubmit={this.handleSubmitTeamMemberForm} /> }
      </div>
      <div className={cs['submit-btn-container']}>
        <button className='btn btn-primary btn-lg btn-block' type='button'>确认团队信息</button>
      </div>
    </div>
  }
}
