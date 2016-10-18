import React, { Component } from 'react'
import { Link } from 'react-router'

import NavBack from 'components/NavBack'
import Footer from 'components/Footer'
import style from './Dashboard.scss'

export class Dashboard extends Component {
  render () {
    const { children, push, routes} = this.props
    
    let content = null
    let footer = null

    if (children) {
      content = children;
      
      // if (routes && routes[2].path != 'signin' &&
      //   routes[2].path != 'signup' &&
      //   routes[2].path != 'resetPassword'
      // ) {
      //   footer = <Footer activeNavTab='DASHBOARD' />
      // }
    } else {
      push('/dashboard/me')
    }

    return (
      <div>
        {content}
        {footer}
      </div>
    )
  }
}

export default Dashboard
