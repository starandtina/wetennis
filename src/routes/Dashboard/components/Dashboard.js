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
    const { children, push } = this.props
    let content = null;

    if (children) {
      content = children
    } else {
      console.log(push);
      push('/dashboard/Mine')
    }
    return (
      <div style={{ height: '100%', marginTop: '55px', paddingBottom: '55px' }}>
        {content}
        <Footer activeNavTab='DASHBOARD' />
      </div>
    )
  }
}

export default Dashboard
