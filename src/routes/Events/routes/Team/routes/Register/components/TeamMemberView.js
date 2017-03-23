import React from 'react'

import cs from './TeamMemberView.scss'

const TeamMemberView = props => {
  const { id, name, gender, identifyCard, passport, isBench, suppressActions = false, deleteTeamMember = () => {}, editTeamMember = () => {} } = props

  return  <div className={cs['team-member-view-container']}>
    <div>
      <label>{name}</label>
      {
        !suppressActions &&
          <div className='pull-right'>
            <i onClick={deleteTeamMember.bind(this, id)} className={`${cs['team-member-action-icon']} material-icons u-marginRight5`}>delete</i>
            <i onClick={editTeamMember.bind(this, id)} className={`${cs['team-member-action-icon']} material-icons`}>mode_edit</i>
          </div>
      }
    </div>
    <div className='text-muted'>
      <p>{ gender === 'male' ? '男' : '女' }</p>
      <p>
        { identifyCard && `身份证 ${identifyCard}` }
        { passport && `护照 ${passport}` }
        { !identifyCard && !passport && <span>&nbsp;</span> }
        { isBench && <span className='pull-right badge'>替补</span> }
      </p>
    </div>
  </div>
}

export default TeamMemberView
