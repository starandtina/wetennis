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
    const { params } = this.props
    const requestPayload = { eventId: params.eventId }

    this.props.fetchEventGroups(requestPayload)
    this.props.fetchRegisteredUsers(requestPayload)
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
    console.log('render Item');
    console.log(items);

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
    console.log(this.state.item);
    console.log(this.props);
    const { partners } = this.props;
    console.log(partners);
    const partner = this.state.item.needPartner ? (
      <Panel header='搭档' eventKey="2">
        {partners.map(item => {
        console.log(item);
          console.log(this.state.partnerId, item.id);
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
    const { params } = this.props;
    this.setState({
      item: item
    })
    this.props.fetchPartners({
      eventId: params.eventId,
      groupId: this.state.group.id,
      itemId: this.state.item.id
    })
  }

  handlePartnerHeaderClick(item) {
    const { setPartnerId } = this.props;
    this.setState({
      partnerId: item.id
    });
    console.log(item.id);
    setPartnerId(item.id)
  }
}

export default Register
