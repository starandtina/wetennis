import React from 'react'
import cs from './TeamMemberView.scss'

const TeamMemberView = props => {
  const { name, gender, identifyCard, passport } = props

  return  <div className={cs['team-member-view-container']}>
    <div>
      <label>{name}</label>
    </div>
    <p>{gender === 'male' ? '男' : '女'}</p>
    { identifyCard ? <p>身份证 identifyCard</p> : undefined }
    { passport ? <p>护照 passport</p> : undefined }
  </div>
}

export default TeamMemberView
