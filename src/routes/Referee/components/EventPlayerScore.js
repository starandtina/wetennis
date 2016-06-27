import React from 'react'

import { cls } from 'utils'
import classes from './EventPlayerScore.scss'


const renderEventPlayer = ({ name }) => {
  return (
    <div className='grid grid--gutters'>
      <div className='grid-cell'>
        <span className={classes['player-1']}>Player 1</span>
        <span>{name}</span>
      </div>
      <div className='grid-cell grid'>
        <span className={cls`grid-cell ${classes['game-score']}
                          ${true ? classes.highlight : ''}`}>1</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>2</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>3</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>4</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>5</span>
      </div>
    </div>
  )
}

class EventPlayerScore extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className={classes['event-game-score']}>
          {renderEventPlayer({ name: '陈韵竹' })}
          {renderEventPlayer({ name: '陈龙' })}
        </div>

        {this.renderLivingScore()}
      </div>
    )
  }

  renderLivingScore() {
    return (
      <div className={cls`${classes['living-score-container']}`}>
        <div className='row'>
          <div className='col-xs-5'>
            <div className='pull-right'>
              <span className={classes['player-name']}>陈韵竹</span>
              <img className={classes['player-icon']} src='http://e.hiphotos.baidu.com/news/q%3D100/sign=3abb8c8fbe389b503effe452b534e5f1/fc1f4134970a304e2975366bd6c8a786c8175ccf.jpg' />
            </div>
          </div>
          <div className='col-xs-2'></div>
          <div className='col-xs-5'>
            <div className='pull-left'>
              <span className={classes['player-name']}>陈韵竹</span>
              <img className={classes['player-icon']} src='http://e.hiphotos.baidu.com/news/q%3D100/sign=3abb8c8fbe389b503effe452b534e5f1/fc1f4134970a304e2975366bd6c8a786c8175ccf.jpg' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-5'>
            <h1 className={cls`pull-right
                    ${classes['living-score']}`}>30</h1>
          </div>
          <div className='col-xs-2'><h1 className={classes['living-score']}>:</h1></div>
          <div className='col-xs-5'>
            <h1 className={cls`pull-left
                    ${classes['living-score']}`}>15</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default EventPlayerScore
