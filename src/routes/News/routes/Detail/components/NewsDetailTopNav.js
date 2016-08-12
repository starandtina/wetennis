import React from 'react'
import TopNav from 'components/TopNav'
import { browserHistory } from 'react-router'

import classes from './NewsDetailTopNav.scss'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

class NewsDetailTopNav extends React.Component {
  render() {
    return (
      <TopNav title='新闻详情'>
        <div ref='left'>
          <a className={`${classes['nav-back-icon']} pull-left`} href='#' onClick={goBack}><i className='u-verticalAlignMiddle material-icons'>keyboard_arrow_left</i></a>
        </div>
        <div ref='right'>

        </div>
      </TopNav>
    );
  }
}

export default NewsDetailTopNav
