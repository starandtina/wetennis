import React, { Component } from 'react'

import cs from './Program.scss'

export default class Match extends Component {
  render() {
    const { match: { players: matchPlayers = [], name }, players, courtId, matchId, index } = this.props
    const [playerAId, playerBId] = matchPlayers
    const playerAName = playerBId && players[playerAId].name
    const playerBName = playerBId && players[playerBId].name

    return <div
        className={cs.match}
        data-court-id={courtId}
        data-match-id={matchId}>
      {index >= 0 ? `第${index+1}场` : ''}
      <p>{name}</p>
      <p>{playerAName} VS {playerBName}</p>
    </div>
  }
}
