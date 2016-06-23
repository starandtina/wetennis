import React from 'react'
import TopNav from 'components/TopNav'

import classes from './RefereeTopNav.scss'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

class RefereeTopNav extends React.Component {
  render() {
    return (
      <TopNav title='计分板'>
        <div ref='left'>
          <a className={`${classes['nav-back-icon']} pull-left`} href='#' onClick={goBack}><i className='u-verticalAlignMiddle material-icons'>keyboard_arrow_left</i></a>
        </div>
        <div ref='right'>

        </div>
      </TopNav>
    );
  }
}

export default RefereeTopNav
