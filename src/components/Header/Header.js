import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>wetennis</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
     {' · '}
     <Link to='/signup' activeClassName={classes.activeRoute}>
      Signup
    </Link>
     {' · '}
     <Link to='/dashboard' activeClassName={classes.activeRoute}>
      Dashboard
    </Link>
  </div>
)

export default Header
