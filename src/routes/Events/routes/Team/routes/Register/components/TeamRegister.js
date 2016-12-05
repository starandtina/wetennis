import React, { PureComponent } from 'react'
import uuid from 'uuid'
import { browserHistory } from 'react-router'

import NavBack from 'components/NavBack'
import TeamRegisterFormContainer from '../containers/TeamRegisterForm'
import TeamMemberFormContainer from '../containers/TeamMemberForm'
import TeamMemberView from './TeamMemberView'
import { buildUrl } from 'utils'

import cs from './TeamRegister.scss'

export default class TeamRegisterContainer extends PureComponent {
  componentDidMount() {
    document.body.classList.add(cs['body-backgroundColor'])

    const { fetchEventGroups, fetchRegisteredTeams, params: { eventId } } = this.props

    fetchEventGroups({eventId})
    fetchRegisteredTeams({eventId})
  }

  componentWillUnmount() {
    document.body.classList.remove(cs['body-backgroundColor'])
  }

  handleSubmitForm = () => {
    const { submitTeamRegisterForm } = this.props

    submitTeamRegisterForm('TeamRegisterForm')
  }

  handleSubmitTeamRegisterForm = (values) => {
    const { registerTeam, members, groups, push, params: {eventId} } = this.props
    const { groupId } = values
    const group = groups.find( group => group.id === groupId)

    registerTeam({
      ...values,
      members,
    }).then(( { payload: { code, errorMsg, data } } = data) => {
      if (Number(code) === 0 && !errorMsg) {
        push(
          buildUrl(`/events/${eventId}/team/${data.teamId}/pay`, {
            payUrl: data.payUrl,
            price: group.price,
          })
        )
      }
    })
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
    const { editing, startAddTeamMember, cancelEditTeamMember, members, push, params: {eventId} } = this.props

    return <div className={`${cs['team-register-container']} u-has-nav`}>
      <NavBack routes={this.props.routes} caption='团体报名' handleGoBack={() => push(`/events/${eventId}`)}>
        <div onClick={startAddTeamMember}>
          <i className={`material-icons`}>add</i><i className={`material-icons`}>people</i>
        </div>
      </NavBack>
      <div className='container'>
        <TeamRegisterFormContainer {...this.props} onSubmit={this.handleSubmitTeamRegisterForm} />
        <p className='text-muted'>队员</p>
        {Object.keys(members).map( k => (
          members[k] && <TeamMemberView key={k} id={k} {...members[k]} {...this.props} />
        ))}
        { editing && 
          <TeamMemberFormContainer {...this.props}
            onCancel={cancelEditTeamMember}
            onSubmit={this.handleSubmitTeamMemberForm} /> }
      </div>
      <div className={cs['submit-btn-container']}>
        <button className='btn btn-primary btn-lg btn-block' onClick={this.handleSubmitForm} type='button'>确认团队信息</button>
      </div>
    </div>
  }
}
