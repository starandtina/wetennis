import React from 'react'

import { cls } from 'utils'
import classes from './EventPlayerScore.scss'


const renderEventPlayer = ({ name, gameScores, index = 1}) => {
  const [ gs1, gs2, gs3, gs4, gs5 ] = gameScores

  return (
    <div className='grid grid--gutters'>
      <div className='grid-cell'>
        <span className={cls`${classes['player-' + index]}`}>Player {index}</span>
        <span className={classes['highlight']}>{name}</span>
      </div>
      <div className='grid-cell grid'>
        <span className={cls`grid-cell ${classes['game-score']}
                          ${true ? classes.highlight : ''}`}>{gs1}</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>{gs2}</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>{gs3}</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>{gs4}</span>
        <span className={cls`grid-cell ${classes['game-score']}`}>{gs5}</span>
      </div>
    </div>
  )
}

class EventPlayerScore extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const [player1, player2] = this.props.referee.players

    return (
      <div>
        <div className={classes['event-game-score']}>
          {renderEventPlayer({ ...player1, index: 1})}
          {renderEventPlayer({ ...player2, index: 2})}
        </div>

        {this.renderLivingScore()}
      </div>
    )
  }

  renderLivingScore() {
    const [player1, player2] = this.props.referee.players

    return (
      <div className={cls`${classes['living-score-container']}`}>
        <div className='row'>
          <div className='col-xs-5'>
            <div className='pull-right'>
              <span className={classes['player-name']}>{player1.name}</span>
              <img className={classes['player-icon']} src={player1.iconUrl} />
            </div>
          </div>
          <div className='col-xs-2'></div>
          <div className='col-xs-5'>
            <div className='pull-left'>
              <span className={classes['player-name']}>{player1.name}</span>
              <img className={classes['player-icon']} src={player2.iconUrl} />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-5'>
            <h1 className={cls`pull-right
                    ${classes['living-score']}`}>{player1.livingScore}</h1>
          </div>
          <div className='col-xs-2'><h1 className={classes['living-score']}>:</h1></div>
          <div className='col-xs-5'>
            <h1 className={cls`pull-left
                    ${classes['living-score']}`}>{player2.livingScore}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default EventPlayerScore
