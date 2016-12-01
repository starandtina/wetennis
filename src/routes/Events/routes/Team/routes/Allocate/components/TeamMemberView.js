import React from 'react'

import cs from './TeamMemberView.scss'

const TeamMemberView = props => {
  const { id, name, gender, identifyCard, passport, isBench, deleteTeamMember, editTeamMember  } = props

  return  <div className={cs['team-member-view-container']}>
    <div>
      <label>{name}</label>
      { isBench && 
        <div className='pull-right'>
          <span className='pull-right badge'>替补</span>
        </div>
      }
    </div>
    <div className='text-muted'>
      <p>{ gender === 'male' ? '男' : '女' }</p>
      <p>
        { identifyCard && `身份证 ${identifyCard}` }
        { passport && `护照 ${passport}` }
      </p>
    </div>
  </div>
}

export default TeamMemberView
