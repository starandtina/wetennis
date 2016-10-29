import React, { Component } from 'react'

import cs from './Program.scss'

export default class Match extends Component {
  render() {
    const { match, players, courtId, matchId, index } = this.props
    const [playerAId, playerBId] = match.players
    const playerAName = playerBId && players[playerAId].name
    const playerBName = playerBId && players[playerBId].name

    return <div 
        className={cs.match}
        data-court-id={courtId}
        data-match-id={matchId}>
      {index >= 0 ? `第${index+1}场` : ''}
      <p>{match.name}</p>
      <p>{playerAName} VS {playerBName}</p>
    </div>
  }
}
