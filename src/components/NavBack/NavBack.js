import React from 'react'
import { browserHistory } from 'react-router'

import classes from './NavBack.scss'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NavBack = ( {caption} ) => (
  <div className={`${classes['nav-back']} text-center`}>
    <h4>
      <a className={`${classes['nav-back-icon']} pull-left`} href='#' onClick={goBack}>&lt;</a>
      <span className={classes.caption}>{caption || 'wetennis'}</span>
    </h4>
  </div>
)

export default NavBack

