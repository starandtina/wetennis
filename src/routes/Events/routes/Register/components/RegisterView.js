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

    const { group, item } = this.props
    const eventId = this.props.params.eventId
    this.props.actions.selectCategory({
      group,
      item
    })
    this.props.actions.push(`/events/${eventId}/register/confirmation`)
  }
}

export default RegisterView

