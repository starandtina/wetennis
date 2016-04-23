import React from 'react'

export class Dashboard extends React.Component {
  props: Props;

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.user || (this.props.user.user && !nextProps.user.user)) {
      this.props.actions.push('/signup')
    }
  }

  render () {

    return (
      <div>
        Dashboard!
        <button onClick={this.props.actions.logoutUser.bind(this)}>LOGOUT</button>
      </div>
    )
  }
}

export default Dashboard
