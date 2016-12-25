import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import NavBack from 'components/NavBack'
import { cls, goBack, debounce } from 'utils'
import cs from './Partner.scss'

export default class Partner extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { open: false, partnerId: props.partner.id }

    const { fetchMyFriendList, user } = this.props

    this.debouncedFetchMyFriendList = debounce(data => fetchMyFriendList({
      userId: user.id,
      ...data,
    }), 500)
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  setPartner = () => {
    const { setPartner } = this.props

    this.setState({
      open: !this.state.partnerId
    })

    if (this.state.partnerId) {
      setPartner({
        partnerId: this.state.partnerId
      })
      goBack()
    }
  }

  handleSearchTextFieldChange = event => {
    this.setState({
      open: false,
      partnerId: null,
    })
    this.debouncedFetchMyFriendList({
      searchValue: event.target.value,
    })
  }

  handleClickPartner = (partnerId) => {
    this.setState({
      partnerId,
    })
  }

  render() {
    const { partnerList } = this.props
    const actions = [
      <FlatButton
        label='取消'
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]

    return <div className='u-has-nav container-fluid'>
      <NavBack routes={this.props.routes} caption='搭档' transparent={false} handleGoBack={goBack}>
        <div onClick={this.setPartner}>
          <i className={`material-icons`}>done</i>
        </div>
      </NavBack>
      <div className=''>
        <TextField
          hintText='输入姓名或电话号码进行搜索'
          onChange={this.handleSearchTextFieldChange}
          fullWidth
        />
      </div>
      {partnerList.map(p => (
        <div key={p.id}
          className={cls`row
            ${cs['partner-container']}
            ${this.state.partnerId === p.id ? cs.selected : ''}`} onClick={this.handleClickPartner.bind(this, p.id)}>
          <div className='col-xs-6'>{p.name}</div>
          <div className='col-xs-6 text-right'>{p.phone}</div>
        </div>
      ))}
      <Dialog
          title="请先添加你的搭档"
          actions={actions}
          modal={true}
          open={this.state.open}
        >请先添加你的搭档
        </Dialog>
    </div>
  }
}
