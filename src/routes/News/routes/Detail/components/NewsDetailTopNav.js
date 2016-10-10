import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

import TopNav from 'components/TopNav'

import classes from './NewsDetailTopNav.scss'

class NewsDetailTopNav extends Component {
  render() {
    const { goBack } = this.props

    return (
      <TopNav title='新闻详情'>
        <div ref='left'>
          <a className={`${classes['nav-back-icon']} pull-left`} href='#' onClick={goBack}>
            <i className='u-verticalAlignMiddle material-icons'>
              keyboard_arrow_left
            </i>
          </a>
        </div>
        <div ref='right'></div>
      </TopNav>
    );
  }
}

export default connect(
  null,
  {
    goBack
  },
)(NewsDetailTopNav)
