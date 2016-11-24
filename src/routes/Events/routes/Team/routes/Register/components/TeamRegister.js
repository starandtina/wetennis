import React, { PureComponent } from 'react'

import NavBack from 'components/NavBack'
import TeamRegisterFormContainer from '../containers/TeamRegisterForm'
import TeamMemberFormContainer from '../containers/TeamMemberForm'
import TeamMemberView from './TeamMemberView'

import cs from './TeamRegister.scss'

export default class TeamRegisterContainer extends PureComponent {
  componentDidMount() {
    document.body.classList.add(cs['body-backgroundColor'])
  }

  componentWillUnmount() {
    document.body.classList.remove(cs['body-backgroundColor'])
  }

  handleSubmitTeamMemberForm = (values) => {
    const { addTeamMember } = this.props
    const { name, gender, isBench, identify, idNumber } = values

    addTeamMember({
      name, gender, isBench,
      [identify]: idNumber
    })
  }

  render() {
    const { adding, startAddTeamMember, members } = this.props

    return <div className={`${cs['team-register-container']} u-hasNav`}>
      <NavBack routes={this.props.routes} caption='团体报名'>
        <div className={cs['add-team-member']} onClick={startAddTeamMember}><i className='material-icons'>add</i><i className='material-icons'>people</i></div>
      </NavBack>
      <div className='container'>
        <TeamRegisterFormContainer {...this.props} />
        {members.map( m => {
          return <TeamMemberView key={m.name} {...m} />
        })}
        { adding ? <TeamMemberFormContainer {...this.props} onSubmit={this.handleSubmitTeamMemberForm} /> : undefined}
      </div>
      <div className={cs['submit-btn-container']}>
        <button className='btn btn-primary btn-lg btn-block' type='button'>确认团队信息</button>
      </div>
    </div>
  }
}
