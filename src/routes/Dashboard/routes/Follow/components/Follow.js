import React, { PureComponent } from 'react'

import NavBack from 'components/NavBack'

export default class Follow extends PureComponent {

  componentWillMount() {
    const { fetchFollowedPartnerList, user } = this.props

    fetchFollowedPartnerList({
      userId: user.id,
    })
  }

  handleClick = () => {
    const { addPartner } = this.props

    addPartner()
  }

  render() {
    const { partnerList } = this.props 

    return <div className={`u-has-nav`}>
      <NavBack routes={this.props.routes} caption='添加搭档'>
      </NavBack>
      {partnerList.map(p => (
        <p key={p.id}>{p.name}</p>
      ))}
      <button onClick={this.handleClick}>add partner</button>
    </div>
  }
}
