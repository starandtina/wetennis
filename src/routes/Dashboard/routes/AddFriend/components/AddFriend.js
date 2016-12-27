import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'

import NavBack from 'components/NavBack'
import { cls, goBack, debounce } from 'utils'
import cs from './AddFriend.scss'

export default class AddFriend extends PureComponent {
  constructor(props) {
    super(props)

    const { searchParticipants, user } = this.props

    this.debouncedSearchParticipant = debounce(data => searchParticipants({
      userId: user.id,
      ...data,
    }), 500)
  }

  handleSearchTextFieldChange = e => {
    this.debouncedSearchParticipant({
      searchValue: String(e.target.value).trim(),
    })
  }

  handleGoBack = e => {
    const { clearAddFriend } = this.props

    clearAddFriend()
    goBack(e)
  }

  handleSaveSelectedFriendsClick = () => {
    const { saveFriends, selectedParticipants, clearAddFriend } = this.props

    saveFriends({
      selectedParticipants,
    }).then(({
      payload: {
        code
      }
    }) => {
      if (code === 0) {
        clearAddFriend()
        goBack()
      }
    })
  }

  handleAddFriendClick = friendId => {
    const { addFriend } = this.props

    addFriend(friendId)
  }

  handleRemoveFriendClick = friendId => {
    const { removeFriend } = this.props

    removeFriend(friendId)
  }

  render() {
    const { participantList = [], selectedParticipants = [], friendIds = [] } = this.props

    return <div className='u-has-nav container-fluid'>
      <NavBack routes={this.props.routes} caption='添加好友' transparent={false} handleGoBack={this.handleGoBack}>
      {
        selectedParticipants.length !== 0 &&
        <div onClick={this.handleSaveSelectedFriendsClick}>
          <i className={`material-icons`}>done</i>
        </div>
      }
      </NavBack>
      <div className=''>
        <TextField
          hintText='输入姓名或电话号码进行搜索'
          onChange={this.handleSearchTextFieldChange}
          fullWidth
        />
      </div>
      {participantList.length === 0 && <div className='text-muted small  text-center'>
        <div><i className='material-icons'>sentiment_very_dissatisfied</i></div>
        <p>没有结果，请输入姓名或电话号码进行搜索！</p>
      </div>}
      {participantList.map(p => (
        !friendIds.includes(p.id) &&
        <div key={p.id} 
          className={cls`clearfix ${cs['friend-container']}
            ${selectedParticipants.includes(p.id) ? cs.selected : ''}`}>
          <div className='col-xs-6'>{p.name}</div>
          <div className='col-xs-6 text-right'>
            {selectedParticipants.includes(p.id) ?
            <i onClick={this.handleRemoveFriendClick.bind(this, p.id)} className={`material-icons ${cs['add-icon']}`}>remove</i> :
            <i onClick={this.handleAddFriendClick.bind(this, p.id)} className={`material-icons ${cs['add-icon']}`}>add</i>}
          </div>
        </div>
      ))}
    </div>
  }
}
