import React from 'react'

import NavBack from 'components/NavBack'
import { Accordion, Panel } from 'react-bootstrap';

import RegisterView from './RegisterView'
import RegisteredUsers from './RegisteredUsers'
import classes from './Register.scss'

export class Register extends React.Component {
  state = {
    group: this.props.group,
    item: this.props.item
  }

  constructor(props) {
    super(props)

    const { params } = this.props
    const requestPayload = { eventId: params.eventId }

    this.props.actions.fetchGroups(requestPayload)
    this.props.actions.fetchRegisteredUsers(requestPayload)
  }

  renderCategories() {
    const { items } = this.state.group

    return (
      <Accordion defaultActiveKey="1">
        <Panel header={this.state.group.name} eventKey="1">
          <ul className='list-unstyled'>
          {this.props.groups.map(group => (
            <li className={this.state.group.id === group.id ? `${classes.li} ${classes.selected}` : classes.li } key={group.id} onClick={this.handleGroupHeaderClick.bind(this, group)}>
              <div>{group.name}</div>
            </li>
          ))}
          </ul>
        </Panel>
        <Panel header={this.state.item.name} eventKey="2">
          <ul className='list-unstyled'>
          {items.map(item => (
            <li className={this.state.item.id === item.id ? `${classes.li} ${classes.selected}` : classes.li } key={item.id} onClick={this.handleItemHeaderClick.bind(this, item)}>
              <div className='clearfix'>
                <div className='pull-left'>{item.name}</div>
                <div className='pull-right'>&yen; {item.price}</div>
              </div>
            </li>
          ))}
          </ul>
        </Panel>
      </Accordion>
    )
  }

  render () {
    const { children } = this.props

    let content

    if (children) {
      content = children
    }
    else {
      const categories = this.renderCategories()
      let registerView = (<div></div>)
      let registeredUsers = (<div></div>)

      if (this.state.group.id && this.state.item.id) {
        registerView = <RegisterView  {...this.props} {...this.state} />
        registeredUsers = <RegisteredUsers {...this.props} />
      }

      content = (
        <div>
          {categories}
          {registerView}
          {registeredUsers}
        </div>
      )
    }

    return (
      <div className='register'>
         <NavBack caption='报名' />
         {content}
      </div>
    )
  }

  handleGroupHeaderClick(group) {
    this.setState({
      group: group
    })
  }

  handleItemHeaderClick(item) {
    this.setState({
      item: item
    })
  }
}

export default Register
