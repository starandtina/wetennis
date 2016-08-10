import React, {Component} from 'react';
import NavBack from 'components/NavBack';
import MatchInfo from './eventMatchInfo'
import cs from './eventMatch.scss';

export default class EventMatch extends Component {
  componentDidMount () {
    const { getDetails } = this.props
    getDetails()
    document.body.classList.add(cs.bodyBg)
  }
  componentWillUnmount () {
    document.body.classList.remove(cs.bodyBg)
  }
  render () {
    const {details} = this.props
    return (
      <div className={cs.box}>
        <NavBack title='比赛' />
        <MatchInfo data={details} />
      </div>
    )
  }
}
