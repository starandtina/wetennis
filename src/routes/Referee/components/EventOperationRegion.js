import React, { Component } from 'react'

import { cls } from 'utils'
import classes from './EventOperationRegion.scss'

const renderACE = ({ currentPlayerId, player, operateReferee }) => {
  const handleClick = player.id === currentPlayerId ?
           operateReferee.bind(this, { type: 'ACE', id: currentPlayerId || player.id }):
           undefined
  const highlight = player.id === currentPlayerId

  return (
    <div className={classes.chunk}>
      <span onClick={handleClick} className={cls`op ${highlight ? classes.highlight : ''}`}>ACE球</span>
    </div>
  )
}

const renderForehandAndBackhand = ({ type = 'winner'}) => {
  const labelText = type === 'winner' ? '制胜分' : '非受迫失误'

  return (
    <div className={classes.chunk}>
      <p className={cls`u-textAlignCenter small
                      ${classes['chunk-label']}`}>{labelText}</p>
      <div className='grid'>
        <span className={cls`grid-cell op
                          ${true ? classes.highlight : ''}`}>正手</span>
        <span className={cls`grid-cell op
                          ${true ? classes.highlight : ''}`}>反手</span>
      </div>
    </div>
  )
}

const renderFault = ({ highlight = false }) => {
  return (
    <div className={classes.chunk}>
      <span className={cls`${highlight ? classes.highlight : ''}`}>二发失误</span>
    </div>
  )
}

class EventOperationRegion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={classes['event-operation-region']}>
        {this.renderACERegion()}
        {this.renderForehandAndBackhandRegion()}
        {this.renderFaultRegion()}
        {this.renderUnforcedFaultRegion()}
        {this.renderSystemOperationRegion()}
      </div>
    )
  }

  renderACERegion() {
    const { operateReferee, referee } = this.props
    let { currentPlayerId, players: [player1, player2] } = referee

    currentPlayerId = !currentPlayerId ? player1.id : currentPlayerId

    return (
      <div className={cls`grid ${classes['chunk-container']}`}>
        {renderACE({ currentPlayerId, player: player1, operateReferee })}
        {renderACE({ currentPlayerId, player: player2, operateReferee })}
      </div>
    )
  }

  renderForehandAndBackhandRegion() {
    return (
      <div className={cls`grid
              ${classes['chunk-container']}`}>
          {renderForehandAndBackhand({})}
          {renderForehandAndBackhand({})}
      </div>
    )
  }

  renderFaultRegion() {
    return (
      <div className={cls`grid
              ${classes['chunk-container']}`}>
          {renderFault({highlight: true})}
          {renderFault({highlight: false})}
      </div>
    )
  }

  renderUnforcedFaultRegion() {
    return (
      <div className={cls`grid
              ${classes['chunk-container']}`}>
          {renderForehandAndBackhand({ type: 'UNFORCED_FAULT' })}
          {renderForehandAndBackhand({ type: 'UNFORCED_FAULT' })}
      </div>
    )
  }

  renderSystemOperationRegion() {
    return (
      <div className={cls`grid ${classes['chunk-container']}`}>
        <i className={cls`material-icons grid-cell op ${classes['highlight']}`}>undo</i>
        <i className={cls`material-icons grid-cell op ${classes['highlight']}`}>sync</i>
        <span className={cls`grid-cell op ${classes['highlight']}`}>换边</span>
        <span className={cls`grid-cell op ${classes['highlight']}`}>换发球</span>
      </div>
    )
  }
}

export default EventOperationRegion
