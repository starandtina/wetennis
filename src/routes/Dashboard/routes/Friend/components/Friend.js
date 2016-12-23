import React, { PureComponent } from 'react'

import NavBack from 'components/NavBack'
import { cls } from 'utils'
import cs from './Friend.scss'

export default class Partner extends PureComponent {
  componentWillMount() {
    const { fetchMyFriendList, user } = this.props

    fetchMyFriendList({
      userId: user.id
    })
  }

  render() {
    const { routes, friendList  } = this.props 

    return <div className='u-has-nav container-fluid'>
      <NavBack routes={routes} caption='好友' transparent={false}>
        <div>
          <i className={`material-icons`}>add</i><i className={`material-icons`}>people</i>
        </div>
      </NavBack>
      {friendList.map(p => (
        <div key={p.id} 
          className={cls`row 
            ${cs['friend-container']}`}>
          <div className='col-xs-6'>{p.name}</div>
          <div className='col-xs-6 text-right'>{p.phone}</div>
        </div>
      ))}
    </div>
  }
}
