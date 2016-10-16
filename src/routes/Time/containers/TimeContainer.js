import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

import Footer from 'components/Footer'
import style from './TimeContainer.scss';
import TimeItem from '../components/TimeItem';
import { fetchTimesList, fetchTimeInfo, fetchDeleteTime } from '../actions';

const mapStateToProps = (state) => ({
  user: state.user,
  time: state.time
});

const mapDispatchToProps = ({
  fetchTimesList, fetchTimeInfo, push, fetchDeleteTime
})

class Times extends Component {
  render() {
    const { time, children, fetchDeleteTime, user: { user }, push } = this.props;
    let content = null;
    let footer =  null;
    if (children) {
      content = children;
      footer =  null;
    } else {
      if(user === null) {
        return <div></div>;
      }
      push(`/time/users/${user.id}`)
    }
    return (
      <div style={{ height: '100%'}}>
        {content}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Times)
