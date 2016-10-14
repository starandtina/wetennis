import React, {Component} from 'react';
import NavBack from 'components/NavBack';
import MatchInfo from './eventMatchInfo'
import MatchTab from "./eventMatchTab";
import cs from './eventMatch.scss';

export default class EventMatch extends Component {
  componentDidMount () {
    const {
      getDetails, getTechnicalStatistics, getGuess,
      params:{matchId}
    } = this.props
    getDetails(matchId)
    // getGuess(matchId)
    getTechnicalStatistics(matchId)
    document.body.classList.add(cs.bodyBg)
  }
  componentWillUnmount () {
    document.body.classList.remove(cs.bodyBg)
  }
  render () {
    const {
      details, technicalStatistics, guess,
      params: {matchId}} = this.props
    return (
      <div className={cs.box}>
        <NavBack title='比赛' transparent />
        <MatchInfo data={details} />
        <MatchTab
          matchId={matchId}
          technicalStatistics={technicalStatistics}
          guess={guess}
        />
      </div>
    )
  }
}
