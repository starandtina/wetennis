import React from 'react'

import NavBack from 'components/NavBack'
import { Accordion, Panel } from 'react-bootstrap'

import RegisterView from './RegisterView'
import RegisteredUsers from './RegisteredUsers'
import classes from './Register.scss'

export class Register extends React.Component {
  state = {
    group: this.props.group,
    item: this.props.item,
    partners: this.props.partners
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { params, userId } = this.props;
    if (!userId) {
      this.props.push('/dashboard/signin')
      return;
    }
    const requestPayload = { eventId: params.eventId }
    console.log('didmount');
    this.props.fetchEventGroups(requestPayload)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps');
  }

  _renderEventGroups() {
    const { groups } = this.props

    return (
      <ul className='list-unstyled'>
        {groups.map(group => (
          <li className={this.state.group.id === group.id ? `${classes.li} ${classes.selected}` : classes.li } key={group.id} onClick={this.handleGroupHeaderClick.bind(this, group)}>
            <div>{group.name}</div>
          </li>
        ))}
      </ul>
    )
  }

  _renderEventGroupItems() {
    const { items } = this.state.group;

    return (
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
    )
  }

  renderCategories() {
    const { partners } = this.props;
    const partner = this.state.item.needPartner ? (
      <Panel header='搭档' eventKey="2">
        {partners.map(item => {
        return (
        <li className={this.state.partnerId == item.id ? `${classes.li} ${classes.selected}` : classes.li } key={item.id} onClick={this.handlePartnerHeaderClick.bind(this, item)}>
          <div className='clearfix'>
            <div className='pull-left'>{item.name}</div>
            <div className='pull-right'></div>
          </div>
        </li>
        )
      })}
      </Panel>
    ) : null;

    return (
      <Accordion defaultActiveKey="1">
        <Panel header={this.state.group.name} eventKey="1">
          {this._renderEventGroups()}
        </Panel>
        <Panel header={this.state.item.name || '项目'} eventKey="2">
          {this._renderEventGroupItems()}
        </Panel>
        {partner}
      </Accordion>
    )
  }

  render() {
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
        <div className={classes.MarginTop}>
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
      group: group,
      item: {}
    })
  }

  handleItemHeaderClick(item) {
    const { userId } = this.props;
    this.setState({
      item: item
    });
    if (item.needPartner) {
      this.props.fetchPartners({
        userid: userId
      })
    }
    this.props.fetchRegisteredUsers({
      itemId: item.id
    });
  }

  handlePartnerHeaderClick(item) {
    const { setPartnerId } = this.props;
    this.setState({
      partnerId: item.id
    });
    setPartnerId(item.id)
  }
}

export default Register
