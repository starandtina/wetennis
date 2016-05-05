import React from 'react'

import classes from './Register.scss'

export const RegisterView = ( {registeredUsers} ) => {
  return (
    <div>
      <hr/>
      {registeredUsers.map(user => (
        <div key={user.id} className={`row ${classes['register-user-container']}`}>
          <div className='col-xs-2'>
            <img style={{width: "32px", height: "32px"}} src={user.thumbImgUrl} alt="..." className='img-circle' />
          </div>
          <div className='col-xs-10 small'>
            <div className={classes.fontcolor}>{user.name}</div>
            <div>{user.registerDate}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RegisterView

