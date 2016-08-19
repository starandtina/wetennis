import React, { Component } from 'react';
import NavBack from 'components/NavBack';
import { bindActionCreators } from 'redux'
import { push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-bootstrap'
import classes from './AddressEdit.scss'

import { updateSettings } from 'routes/Dashboard/modules/settings'

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  updateSettings,
  push,
  goBack
};

class AddressEdit extends React.Component {
  deleteAddr = () => {
    const {
      updateSettings,
      settings: { address },
      params: { id },
      goBack
      } = this.props;
    const newAddr = address.filter((item, index) => index != id);
    updateSettings({
      address: newAddr
    })
    goBack();
  }

  change = field => ({ target: { value }}) => {
    const {
      updateSettings,
      settings: { address },
      params: { id },
      } = this.props;
    const newAddr = address.map((item, index) => {
      if (index != id) {
        return item;
      } else {
        return ({
          ...item,
          [field]: value
        })
      }
    });
    updateSettings({
      address: newAddr
    })
  }

  render () {
    const {
      params: { id },
      settings: {
        address
        }
      } = this.props;

    if(!address || !address[id]){
      return null;
    }
    const currentAddress = address[id];
    const style = {
      width: '100%'
    };
    return (
      <div>
        <NavBack caption='我的地址'>
          <div onClick={this.deleteAddr} className={classes.Icon} ><i className="material-icons">delete</i></div>
        </NavBack>
        <div className={classes.Field}>
          <TextField
            style={style}
            hintText="收货人"
            floatingLabelText="收货人"
            name="name"
            value={currentAddress.name}
            onChange={this.change('name')}
          />
          <TextField
            style={style}
            hintText="手机号码"
            floatingLabelText="手机号码"
            name="phone"
            value={currentAddress.phone}
            onChange={this.change('phone')}
          />
          <TextField
            style={style}
            hintText="地区"
            floatingLabelText="地区"
            name="district"
            value={currentAddress.district}
            onChange={this.change('district')}
          />
          <TextField
            style={style}
            hintText="详细地址"
            floatingLabelText="详细地址"
            name="detailAddress"
            value={currentAddress.detailAddress}
            onChange={this.change('detailAddress')}
          />
          <TextField
            style={style}
            hintText="邮编"
            floatingLabelText="邮编"
            name="post"
            value={currentAddress.post}
            onChange={this.change('post')}
          />
        </div>
      </div>

    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressEdit)
