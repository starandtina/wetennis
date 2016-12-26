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

  handleSaveSelectedFriendsClick = () => {
    const { saveFriends, selectedParticipants } = this.props

    saveFriends({
      selectedParticipants,
    }).then(({
      payload: {
        code
      }
    }) => {
      if (code === 0) {
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
    const { participantList = [], selectedParticipants = [] } = this.props

    return <div className='u-has-nav container-fluid'>
      <NavBack routes={this.props.routes} caption='添加好友' transparent={false} handleGoBack={goBack}>
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
      {participantList.map(p => (
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
