import React from 'react'

import classes from './Register.scss'

export const RegisterView = ( { registeredUsers } ) => {
  return (
    <div>
      <hr/>
      {registeredUsers.map(user => (
        <div key={user.name} className={`row ${classes['register-user-container']}`}>
          <div className='col-xs-2'>
            <img style={{width: "32px", height: "32px"}} src={user.thumbImgUrl[0]} alt="..." className='img-circle' />
          </div>
          <div className='col-xs-7'>
            <div className={classes.fontcolor}>{user.name.join(' ')}</div>
          </div>
          <div className='col-xs-3'>
            <div className={classes.right}>{user.registerDatestr}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RegisterView

