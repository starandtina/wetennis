import React from 'react'
import { browserHistory } from 'react-router'

import classes from './NavBack.scss'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NavBack = ( {caption, style} ) => (
  <div className={`${classes['nav-back']} text-center clearfix`}>
    <h4>
      <a style={style} className={`${classes['nav-back-icon']} pull-left`} href='#' onClick={goBack}><i className='material-icons'>keyboard_arrow_left</i></a>
      <span style={style} className={classes.caption}>{caption || 'wetennis'}</span>
    </h4>
  </div>
)

export default NavBack

