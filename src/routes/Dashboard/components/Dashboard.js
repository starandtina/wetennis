import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './Dashboard.scss'

export class Dashboard extends Component {
  render () {
    const { children, push, routes} = this.props
    
    let content = null
    let footer = null

    if (children) {
      content = children
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
