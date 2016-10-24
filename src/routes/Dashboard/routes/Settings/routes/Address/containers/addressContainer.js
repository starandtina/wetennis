import React, { Component } from 'react';
import NavBack from 'components/NavBack'
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import Divider from 'material-ui/Divider';
import { updateSettings } from 'routes/Dashboard/modules/settings'

import classes from './addressContainer.scss';

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  updateSettings,
  push
};

class Security extends Component {

  handleChange = field => ({ target: { value } }) => {
    const { updateUserInfo } = this.props;
    updateUserInfo({
      [field]: value,
    });
  };

  newAddress = () => {
    const { push, updateSettings, settings } = this.props;
    const address = settings.address;
    const len = address.length;
    const newAddr = address.push({
      id: len,
      "name": `地址${len}`,
      "phone": "",
      "district": "",
      "detailAddress": "",
      "post": ""
    });
    updateSettings({
      address
    });
    push(`/dashboard/settings/address/${len}`)
  };

  render() {
    const {
      settings: {
        address: originAddress,
        defaultAddress
        },
      children,
      } = this.props;
    if (children) {
      return (
        <div>{children}</div>
      )
    }
    const underlineStyle = {
      display: 'none'
    }
    let content = null;
    const address = originAddress.map((item, index) => ({
      ...item,
      id: index
    }))
    if (address && address.length > 0) {
      content = address.map((item, index) => (
        <div key={index} className={classes.Link}>
          <Link to={`/dashboard/settings/address/${item.id}`}>
            <div>{item.name}</div>
            <div>{item.district + item.detailAddress}</div>
            <i className="material-icons">chevron_right</i>
          </Link>
          <Divider />
        </div>
    ))}
    return (
      <div className='u-hasNav'>
        <NavBack routes={this.props.routes} caption='我的地址'>
          <div className={classes.Icon} onClick={this.newAddress} to="/dashboard/settings/address/new"><i className="material-icons">add</i></div>
        </NavBack>
          {content}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Security)
