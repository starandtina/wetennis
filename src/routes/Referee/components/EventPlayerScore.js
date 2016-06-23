import React from 'react'

import { cls } from 'utils'

import classes from './EventPlayerScore.scss'

class EventPlayerScore extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className={classes['event-game-score']}>
          <div className='row'>
            <div className='col-xs-6'>
              <span className={classes['player-1']}>Player 1</span>
              <span>陈韵竹</span>
            </div>
            <div className='col-xs-6'>
              <span className={cls`${classes['game-score']}
                                ${true ? classes.highlight : ''}`}>1</span>
              <span className={cls`${classes['game-score']}`}>2</span>
              <span className={cls`${classes['game-score']}`}>3</span>
              <span className={cls`${classes['game-score']}`}>4</span>
              <span className={cls`${classes['game-score']}`}>5</span>
            </div>
          </div>
          <div className={`row ${classes['player-2-container']}`}>
            <div className='col-xs-6'>
              <span className={classes['player-2']}>Player 2</span>
              <span>陈韵竹</span>
            </div>
            <div className='col-xs-6'></div>
          </div>
        </div>
        <h1>EventPlayerScore</h1>
      </div>
    )
  }
}

export default EventPlayerScore
