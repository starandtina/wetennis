import React, { PureComponent } from 'react'
import { Accordion, Panel } from 'react-bootstrap'
import { Link } from 'react-router'

import NavBack from 'components/NavBack'
import RegisterView from './RegisterView'
import RegisteredUsers from './RegisteredUsers'
import cs from './Register.scss'

export default class Register extends PureComponent {
  state = {
    group: this.props.group,
    item: this.props.item,
  }

  componentDidMount() {
    const { params, userId } = this.props
    
    if (!userId) {
      this.props.push('/dashboard/signin')

      return
    }

    const requestPayload = { eventId: params.eventId }

    this.props.fetchEventGroups(requestPayload)
  }

  handleGroupHeaderClick(group) {
    this.setState({
      group: group,
      item: {},
    })

    this.props.selectCategory({
      group,
    })
  }

  handleItemHeaderClick(item) {
    const { userId } = this.props
    
    this.setState({
      item: item
    })

    this.props.fetchRegisteredUsers({
      itemId: item.id
    })

    this.props.selectCategory({
      item,
    })
  }

  renderEventGroups() {
    const { groups } = this.props

    return (
      <ul className='list-unstyled'>
        {groups.map(group => (
          <li className={this.state.group.id === group.id ? `${cs.li} ${cs.selected}` : cs.li } key={group.id} onClick={this.handleGroupHeaderClick.bind(this, group)}>
            <div>{group.name}</div>
          </li>
        ))}
      </ul>
    )
  }

  renderEventGroupItems() {
    const { items } = this.state.group

    return (
      <ul className='list-unstyled'>
        {items.map(item => (
          <li className={this.state.item.id === item.id ? `${cs.li} ${cs.selected}` : cs.li } key={item.id} onClick={this.handleItemHeaderClick.bind(this, item)}>
            <div className='clearfix'>
              <div className='pull-left'>{item.name}</div>
              <div className='pull-right'>&yen; {item.price}</div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderCategories() {
    const { partner } = this.props

    const partnerContainer = this.state.item.needPartner ? (
      <Panel header='搭档' eventKey="2">
        {partner ? 
          <ul className='list-unstyled'>
            <li className={`${cs.li} ${cs.selected}`}>
              <div className='clearfix'>
                <div className='pull-left'>{partner.name}</div>
                <div className='pull-right'></div>
              </div>
            </li>
           </ul> : <Link to={`/dashboard/partner`}>添加搭档</Link>}
      </Panel>
    ) : null

    return (
      <Accordion defaultActiveKey="1">
        <Panel header={this.state.group.name} eventKey="1">
          {this.renderEventGroups()}
        </Panel>
        <Panel header={this.state.item.name || '项目'} eventKey="2">
          {this.renderEventGroupItems()}
        </Panel>
        {partnerContainer}
      </Accordion>
    )
  }

  render() {
    const { children } = this.props

    let content

    if (children) {
      content = children
    } else {
      const categories = this.renderCategories()
      let registerView = (<div></div>)
      let registeredUsers = (<div></div>)

      if (this.state.group.id && this.state.item.id) {
        registerView = <RegisterView  {...this.props} {...this.state} />
        registeredUsers = <RegisteredUsers {...this.props} />
      }

      content = (
        <div className={cs.MarginTop}>
          {categories}
          {registerView}
          {registeredUsers}
        </div>
      )
    }

    return (
      <div className='register'>
         <NavBack routes={this.props.routes} caption='报名' />
         {content}
      </div>
    )
  }
}
