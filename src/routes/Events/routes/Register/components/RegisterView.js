import React from 'react'
import classes from './Register.scss'

export class RegisterView extends React.Component {

  render() {
    const { group, item } = this.props

    return (
      <div className={`text-center container ${classes.fontcolor}`}>
        <h5>报名费用</h5>
        <h1>&yen; {item.price}</h1>
        <button type='button' onClick={this.handleClick.bind(this)} className='btn btn-primary btn-lg btn-block'>立即报名</button>
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

export default RegisterView

