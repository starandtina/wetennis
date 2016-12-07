import React from 'react'

import TeamMemberView from './TeamMemberView'
import { cls } from 'utils'

import cs from './TeamSequence.scss'

const TeamSequence = props => {
  const { name, id, teamMembers = [], registeredTeamMembers } = props
  let content = <i className={`material-icons ${cs['add-icon']}`}>add</i>

  if (teamMembers.length > 0) {
    content = (
      teamMembers.map( teamMemberId => (
        <TeamMemberView key={teamMemberId} {...registeredTeamMembers[teamMemberId]} />
      ))
    )
  }

  return <div className={`${cs['team-sequence-container']}`}>
    <p><strong>{name}</strong></p>
    <div 
      className={cls`
          dragula-container 
          u-aligner
          ${cs['dragula-target-container']}
          ${teamMembers.length === 0 && cs['dragula-target-container--with-border']}
      `}
      data-team-sequence-id={id}>
      {content}
    </div>
    <hr />
  </div>
}

export default TeamSequence
