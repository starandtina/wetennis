import React from 'react'
import cs from './Register.scss'

export default class RegisterView extends React.Component {

  render() {
    const { group, item } = this.props

    return (
      <div className={`text-center container ${cs.fontcolor}`}>
        <h4>报名费用</h4>
        <div><span className={cs.yen}>¥ </span><h1 className={`${cs.price}`}>{item.price}</h1></div>
        <button type='button' onClick={this.handleClick.bind(this)} className={`btn btn-primary btn-lg btn-block ${cs['submit-button']}`}>立即报名</button>
      </div>
    )
  }

  handleClick(e) {
    e.preventDefault()

    const { group, item, partnerId } = this.props
    const eventId = this.props.params.eventId
    this.props.selectCategory({
      group,
      item
    })
    if(item.needPartner && !partnerId) {
      alert('双打尚未选择搭档');
    } else {
      this.props.push(`/events/${eventId}/register/confirmation`)
    }
  }
}
