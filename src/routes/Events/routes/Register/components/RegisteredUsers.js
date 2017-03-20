import React from 'react'

import classes from './Register.scss'
import { WETENNIS_URL } from 'utils/url'
import { buildUrl } from 'utils'

export const RegisterView = ( { eventId, registeredUsers } ) => {
  const redirectUrl = `${WETENNIS_URL}/events/${eventId}`

  return (
    <div>
      <hr/>
      {registeredUsers.map(user => (
        <div key={user.name} className={`row ${classes['register-user-container']}`}>
          <div className='col-xs-2'>
            <img style={{width: "32px", height: "32px"}} src={user.thumbImgUrl[0]} alt="..." className='img-circle' />
          </div>
          <div className='col-xs-6'>
            <div className={classes.fontcolor}>
              <span>{user.name.join(' / ')}</span>
              {user.payUrl && <a className={classes['pay-url']} href={buildUrl(user.payUrl, { redirectUrl })}> - 支付链接</a>}
            </div>
          </div>
          <div className='col-xs-4'>
            <div className={classes.right}>{user.registerDatestr}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RegisterView

