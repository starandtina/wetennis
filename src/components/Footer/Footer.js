import React from 'react';
import classes from './Footer.scss'
import { Link } from 'react-router'

export class Footer extends React.Component {
  renderItem(currentTab, name, to) {
    let className = ''

    if(this.props.activeNavTab.toLowerCase() === currentTab.toLowerCase()) {
      className += classes.active
    }

    return (
      <div className='grid-cell text-center'>
        <Link className={className} to={`${to}`} activeClassName={classes.active}>
          <div className={classes.circle}></div>
          <div className={`text-muted ${classes['circle-label']}`}>{name}</div>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className='wetennis-footer'>
        <div className='grid'>
          {this.renderItem('LATEST', '最新', '/')}
          {this.renderItem('EVENT', '赛事', '/events')}
          {this.renderItem('TIME', '时光', '/time')}
          {this.renderItem('GUESS', '竟猜', '/guess')}
          {this.renderItem('DASHBOARD', '我', '/dashboard')}
       </div>
     </div>
    )
  }
}

export default Footer
