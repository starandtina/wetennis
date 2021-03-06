import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router'

import NavBack from 'components/NavBack'
import { cls, goBack, debounce } from 'utils'
import cs from './Partner.scss'

export default class Partner extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { partnerId: props.partner && props.partner.id }

    const { searchParticipants, user } = this.props

    this.debounceSearchParticipants = debounce(data => searchParticipants({
      userId: user.id,
      ...data,
    }), 500)
  }

  componentDidMount() {
    const { fetchMyFriendList, user } = this.props

    fetchMyFriendList({
      userId: user.id,
      searchValue: '',
    })
  }

  setPartner = () => {
    const { setPartner } = this.props

    if (this.state.partnerId) {
      setPartner({
        partnerId: this.state.partnerId
      })
      goBack()
    }
  }

  handleSearchTextFieldChange = e => {
    this.setState({
      partnerId: null,
    })
    this.debounceSearchParticipants({
      searchValue: String(e.target.value).trim(),
    })
  }

  handleClickPartner = (partnerId) => {
    this.setState({
      partnerId,
    })
  }

  render() {
    const { participantList = [] } = this.props

    return <div className='u-has-nav container-fluid'>
      <NavBack routes={this.props.routes} caption='搭档' transparent={false} handleGoBack={goBack}>
      {
        this.state.partnerId &&
          <div onClick={this.setPartner}>
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
      {participantList.length === 0 && <div className='text-muted small text-center'>
        <div><i className='material-icons'>sentiment_very_dissatisfied</i></div>
        <p>没有结果，请输入姓名或电话号码进行搜索! </p>
      </div>}
      {participantList.map(p => (
        <div key={p.id}
          className={cls`row
            ${cs['partner-container']}
            ${this.state.partnerId === p.id ? cs.selected : ''}`} onClick={this.handleClickPartner.bind(this, p.id)}>
          <div className='col-xs-6'>{p.name}</div>
          <div className='col-xs-6 text-right'>{String(p.phone).replace(/\d{4}$/g, 'xxxx')}</div>
        </div>
      ))}
      <p className='text-center'><Link to='/dashboard/friend'>继续添加你的朋友</Link></p>
    </div>
  }
}
