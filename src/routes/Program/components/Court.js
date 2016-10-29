import React, { Component } from 'react'
import dragula from 'react-dragula'

import Match from './Match'
import cs from './Program.scss'

export default class Court extends Component {
  componentDidMount() {
  }

  render() {
    const { court, matches, courtId } = this.props

    return <div className={cs.court}>
        <div className={cs['court-name']}>{court.name}(共{court.matches.length}场比赛)</div>
        <div className='dragula-container' data-court-id={courtId}>
          {court.matches.map((key, index) => (
            <Match key={key} match={matches[key]} index={index} courtId={courtId} matchId={key} {...this.props} />
          ))}
        </div>
    </div>
  }
}
