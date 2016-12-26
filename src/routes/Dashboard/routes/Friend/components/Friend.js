import React, { PureComponent } from 'react'

import NavBack from 'components/NavBack'
import { cls } from 'utils'
import cs from './Friend.scss'

export default class Partner extends PureComponent {
  componentWillMount() {
    const { fetchMyFriendList, user } = this.props

    fetchMyFriendList({
      userId: user.id,
    })
  }

  handleAddFriendClick = () => {
    const { push } = this.props

    push('/dashboard/addFriend')
  }

  render() {
    const { routes, friendList  } = this.props 

    return <div className='u-has-nav container-fluid'>
      <NavBack routes={routes} caption='好友' transparent={false}>
        <div onClick={this.handleAddFriendClick}><i className={`material-icons`}>add</i><i className={`material-icons`}>people</i></div>
      </NavBack>
      {friendList.length === 0 && '请添加您的朋友！'}
      {friendList.map(p => (
        <div key={p.id} 
          className={cls`row small
            ${cs['friend-container']}`}>
          <div className='col-xs-6'>{p.name}</div>
          <div className='col-xs-6 text-right'>{p.phone}</div>
        </div>
      ))}
    </div>
  }
}
