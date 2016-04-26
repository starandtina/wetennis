import React from 'react'

import classes from './VerifyPhone.scss'

export class Sign extends React.Component {

  render () {
    document.querySelector('body').style.backgroundColor = '#1cca5a'

    return (
      <div>
        <div className={classes['nav-header']}>
          <div className='grid'>
            <div className='grid-cell'>
              <i className="material-icons">clear</i>
            </div>
            <div className='grid-cell'>验证手机</div>
            <div className='grid-cell'><i className="material-icons">keyboard_arrow_right</i></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sign
