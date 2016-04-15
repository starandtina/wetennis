import React from 'react'
import { push } from 'react-router-redux'
import classes from './Footer.scss'
import { Link } from 'react-router'

type Props = {

};

export class Footer extends React.Component {
  props: Props;

  renderItem(currentTab, name, to) {
    let className = '';

    if(this.props.currentTab === currentTab) {
      className += classes.active
    }

    return (
      <div className='grid-cell'>
        <Link className={className} to={to}>
          <div className={classes.circle}></div>
          <div className={`text-muted ${classes['circle-label']}`}>{name}</div>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className='grid'>
        {this.renderItem('LATEST', '最新', '')}
        {this.renderItem('EVENT', '赛事', '/event')}
        {this.renderItem('TIME', '时光', '/time')}
        {this.renderItem('GUESS', '竟猜', '/guess')}
        {this.renderItem('ME', '我', '/me')}
     </div>
    )
  }
}

export default Footer

