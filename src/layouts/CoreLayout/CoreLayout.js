import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'

import classes from './CoreLayout.scss'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='page-container'>
    <div className='wetennis'>
      <Header/>
      <div className='wetennis-body'>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
