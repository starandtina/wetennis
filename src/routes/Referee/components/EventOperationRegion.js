import React, { Component } from 'react'

import { cls } from 'utils'
import classes from './EventOperationRegion.scss'

class EventOperationRegion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.renderACERegion()}
        {this.renderForehandAndBackhandRegion()}
      </div>
    )
  }

  renderACERegion() {
    return (
      <div>
        <div className='row'>
          <div className={cls`col-xs-6
                          ${classes['chunk-container']}`}>
            <div className={classes.chunk}>
              <span className={cls`
                                  ${true ? classes.highlight : ''}`}>ACE球</span>
            </div>
          </div>
          <div className={cls`col-xs-6
                          ${classes['chunk-container']}`}>
            <div className={classes.chunk}>
              <span className={cls`
                                  ${false ? classes.highlight : ''}`}>ACE球</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderForehandAndBackhandRegion() {
    return (
      <div>
        <div className='row'>
          <div className={cls`col-xs-6
                          ${classes['chunk-container']}`}>

           <p className={cls`u-textAlignCenter small
                              ${classes['chunk-label']}`}>制胜分</p>
            <div className={classes.chunk}>
              <div className='row'>
                <div className='col-xs-6'>
                  <span className={cls`
                                    ${true ? classes.highlight : ''}`}>正手</span>
                </div>
                <div className='col-xs-6'>
                  <span className={cls`
                                    ${true ? classes.highlight : ''}`}>反手</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cls`col-xs-6
                          ${classes['chunk-container']}`}>
           <p className={cls`u-textAlignCenter small
                              ${classes['chunk-label']}`}>制胜分</p>
            <div className={classes.chunk}>
              <div className='row'>
                <div className='col-xs-6'>
                  <span className={cls`
                                    ${true ? classes.highlight : ''}`}>正手</span>
                </div>
                <div className='col-xs-6'>
                  <span className={cls`
                                    ${true ? classes.highlight : ''}`}>反手</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFaultRegion() {

  }

  renderUnforcedFaultRegion() {

  }
}

export default EventOperationRegion
