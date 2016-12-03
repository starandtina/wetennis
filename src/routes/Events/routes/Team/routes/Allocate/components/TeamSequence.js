import React from 'react'

import cs from './TeamSequence.scss'

const TeamSequence = props => {
  const { name } = props

  return <div className={`${cs['team-sequence-container']}`}>
    <p>{name}</p>
    <div className={`dragula-container u-aligner ${cs['dragula-target-container']}`}>
      <i className={`material-icons ${cs['add-icon']}`}>add</i>
    </div>
    <hr />
  </div>
}

export default TeamSequence
