import React from 'react';
import { Link } from 'react-router';
import NavBack from 'components/NavBack'
import Footer from 'components/Footer'
import style from './Dashboard.scss';

export class Dashboard extends React.Component {

  componentWillReceiveProps (nextProps) {
     //if (!this.props.user.user || (this.props.user.user && !nextProps.user.user)) {
     //  this.props.push('/dashboard/signup')
     //}
  }


  render () {
    const { children, push, routes} = this.props
    let content = null;
    let footer =  null;
    console.log(this.props);
    if (children) {
      content = children;
      if(routes && routes[2].path != 'signin' && routes[2].path != 'signup'&& routes[2].path != 'resetPassword' ) {
        footer = <Footer activeNavTab='DASHBOARD' />
      }
    } else {
      push('/dashboard/Me')
    }
    return (
      <div style={{ height: '100%', marginTop: '55px', paddingBottom: '56px', marginBottom: '56px' }}>
        {content}
        {footer}
      </div>
    )
  }
}

export default Dashboard
