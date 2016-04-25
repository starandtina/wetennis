import React from 'react'
import Footer from 'components/Footer'

export class Dashboard extends React.Component {
  props: Props;

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.user || (this.props.user.user && !nextProps.user.user)) {
      this.props.actions.push('/signup')
    }
  }

  render () {
    const { children } = this.props
    let content = (<div>Dashboard<button onClick={this.props.actions.logoutUser.bind(this)}>LOGOUT</button></div>)

    if (children) {
      content = children
    }
    return (
      <div>
        {content}
        <Footer activeNavTab='DASHBOARD' />
      </div>
    )
  }
}

export default Dashboard
