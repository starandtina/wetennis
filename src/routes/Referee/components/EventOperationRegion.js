import React, { Component } from 'react'

import { cls } from 'utils'
import classes from './EventOperationRegion.scss'

const renderACE = () => {
  return (
    <div className={classes.chunk}>
      <span className={cls`
                  ${true ? classes.highlight : ''}`}>ACE球</span>
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
        <span className={cls`grid-cell
                          ${true ? classes.highlight : ''}`}>正手</span>
        <span className={cls`grid-cell
                          ${true ? classes.highlight : ''}`}>反手</span>
      </div>
    </div>
  )
}

const renderFault = ({ highlight = false }) => {
  return (
    <div className={classes.chunk}>
      <span className={cls`
                  ${highlight ? classes.highlight : ''}`}>二发失误</span>
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
    return (
      <div className={cls`grid
              ${classes['chunk-container']}`}>
        {renderACE()}
        {renderACE()}
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
        <i className={cls`material-icons grid-cell ${classes['highlight']}`}>undo</i>
        <i className={cls`material-icons grid-cell ${classes['highlight']}`}>sync</i>
        <span className={cls`grid-cell ${classes['highlight']}`}>换边</span>
        <span className={cls`grid-cell ${classes['highlight']}`}>换发球</span>
      </div>
    )
  }
}

export default EventOperationRegion
