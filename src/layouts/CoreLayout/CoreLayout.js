import React, { PropTypes } from 'react'
import '../../styles/core.scss'
import Footer from 'components/Footer/Footer'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <div className='view-container'>
        <div className='text-center wetennis'>
          <header className='wetennis-header'>…</header>
          <div className="wetennis-body">
            <h2>WeTennis</h2>
            {children}
          </div>
          <footer className='wetennis-footer'>
            <Footer />
          </footer>
         </div>
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
