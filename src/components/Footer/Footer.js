import React from 'react'

import classes from './Footer.scss'
import { Link } from 'react-router'

type Props = {

};

export class Footer extends React.Component {
  props: Props;

  renderItem(currentTab, name, to) {
    let className = ''

    if(this.props.activeNavTab === currentTab) {
      className += classes.active
    }

    return (
      <div className='grid-cell'>
        <a className={className} onClick={() => this.handleClick(currentTab, to) }>
          <div className={classes.circle}></div>
          <div className={`text-muted ${classes['circle-label']}`}>{name}</div>
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className='grid'>
        {this.renderItem('LATEST', '最新', '')}
        {this.renderItem('EVENT', '赛事', '/event')}
        {this.renderItem('TIME', '时光', '/time')}
        {this.renderItem('GUESS', '竟猜', '/guess')}
        {this.renderItem('ME', '我', '/dashboard')}
     </div>
    )
  }

  handleClick(currentTab, to) {
    this.props.actions.setActiveNavTab(currentTab)
    this.props.history.push(to);
  }
}

export default Footer

