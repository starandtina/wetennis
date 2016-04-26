import React from 'react'
import Footer from 'components/Footer'

export class Dashboard extends React.Component {
  props: Props;

  componentWillReceiveProps(nextProps) {
    // if (!this.props.user.user || (this.props.user.user && !nextProps.user.user)) {
    //   this.props.actions.push('/dashboard/signup')
    // }
  }

  render () {
    const { children } = this.props
    let content = (<div>Dashboard<button onClick={this.props.actions.logoutUser.bind(this)}>LOGOUT</button></div>)
    let footer = (<div></div>)

    if (children) {
      content = children
    }
    else {
      footer = <Footer activeNavTab='DASHBOARD' />
    }
    return (
      <div style={{ height: '100%' }}>
        {content}
        {footer}
      </div>
    )
  }
}

export default Dashboard
