import React, {Component} from 'react';
import NavBack from 'components/NavBack';
import MatchInfo from './eventMatchInfo'
import MatchTab from "./eventMatchTab";
import cs from './eventMatch.scss';

export default class EventMatch extends Component {
  componentDidMount () {
    const {
      getDetails, getComments, getTechnicalStatistics,
      params:{matchId}
    } = this.props
    getDetails(matchId)
    getComments(matchId)
    getTechnicalStatistics(matchId)
    document.body.classList.add(cs.bodyBg)
  }
  componentWillUnmount () {
    document.body.classList.remove(cs.bodyBg)
  }
  render () {
    const {
      details, comments, technicalStatistics,
      likeComment, sendComment,
      params: {matchId}} = this.props
    return (
      <div className={cs.box}>
        <NavBack title='比赛' />
        <MatchInfo data={details} />
        <MatchTab
          matchId={matchId}
          comments={comments}
          likeComment={likeComment}
          sendComment={sendComment}
          technicalStatistics={technicalStatistics}
        />
      </div>
    )
  }
}
