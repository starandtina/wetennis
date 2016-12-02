import React from 'react'

import cs from './TeamMemberView.scss'

const TeamMemberView = props => {
  const { id, name, gender, identifyCard, passport, isBench, deleteTeamMember, editTeamMember  } = props

  return  <div className={`team-allocate-member-view ${cs['team-member-view-container']}`}>
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
      <div className={cs['identify']}>
        { identifyCard && <p>身份证<br/>{identifyCard}</p> }
        { passport && <p>护照<br/>{passport}</p> }
      </div>
    </div>
  </div>
}

export default TeamMemberView
