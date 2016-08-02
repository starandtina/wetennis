import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import NavBack from 'components/NavBack'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-bootstrap'

import { fetchMySettings, updateMySettings } from 'routes/Dashboard/modules/settings'

import classes from './SettingContainer.scss';

const fields = ['email', 'gender', 'birthday', 'startYear', 'hand', 'habit', 'height', 'weight'];

const validate = (values) => {
  var errors = {};
  var hasErrors = false;
  //if(!values.password || values.password.trim() === '') {
  //  errors.password = 'Enter password';
  //  hasErrors = true;
  //}
  //if(!values.phone || values.phone.trim() === '') {
  //  errors.phone = 'Enter phone';
  //  hasErrors = true;
  //}
  //if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
  //  errors.phone = '请输入正确的手机号'
  //  hasErrors = true
  //}
  //if(!values.activationCode || values.activationCode.trim() === '') {
  //  errors.activationCode = 'Enter Code';
  //  hasErrors = true;
  //}
  return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user,
  settings: state.settings
});

//const mapDispatchToProps = (dispatch) => ({
//  ...bindActionCreators({
//    fetchMySettings,
//    updateMySettings,
//    push,
//  }, dispatch)
//})
const mapDispatchToProps = {
    fetchMySettings,
    updateMySettings,
    push
};

class SettingsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    buttonSuspending: false,
    leftTime: 180,
    Tip: '验证',
  };

  componentDidMount () {
    const { fetchMySettings , dispatch} = this.props;
    fetchMySettings();
  }

  handleChange = field => ({ target: { value } }) => {
    this.setState({
      [field]: value,
    });
  };

  handleChangeGender = (event, key, payload) => {
    this.setState({
      gender: payload,
    });
  }

  render () {
    const {
      fields: { email, gender, birthday, startYear, hand, habit, height, weight },
      handleSubmit,
      submitting,
      user,
      settings,
      } = this.props;

    const style = {
      width: '100%'
    };

    return (
        <div>
          <NavBack caption='个人中心'>
          </NavBack>

          <form className='setting-form'>
            <Grid>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>用户名</label>
                </Col>
                <Col xs={8}>
                  <TextField
                      inputStyle={{
                        textAlign: 'left'
                      }}
                      name="name"
                      fullWidth
                      onChange={this.handleChange('name')}
                      defaultValue={this.state.name}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>性别</label>
                </Col>
                <Col xs={8}>
                  <SelectField value={this.state.gender} onChange={this.handleChangeGender}>
                    <MenuItem value='male' primaryText="男" />
                    <MenuItem value='female' primaryText="女" />
                  </SelectField>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>真实姓名</label>
                </Col>
                <Col xs={8}>
                  <TextField
                      inputStyle={{
                        textAlign: 'left'
                      }}
                      name="userName"
                      fullWidth
                      onChange={this.handleChange('userName')}
                      defaultValue={this.state.userName}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>电话</label>
                </Col>
                <Col xs={8}>
                  <TextField
                      inputStyle={{
                        textAlign: 'left'
                      }}
                      name="phone"
                      fullWidth
                      onChange={this.handleChange('phone')}
                      defaultValue={this.state.phone}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>身份证号</label>
                </Col>
                <Col xs={8}>
                  <TextField
                      inputStyle={{
                        textAlign: 'left'
                      }}
                      name="cardId"
                      fullWidth
                      onChange={this.handleChange('cardId')}
                      defaultValue={this.state.cardId}
                  />
                </Col>
              </Row>
            </Grid>
            <div className='button-groups clearfix'>
              {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
              <button type="submit" className="primary btn btn-default btn-lg btn-block" disabled={submitting}>确认修改</button>
            </div>
          </form>
        </div>
    )
  }
}
export default reduxForm({
  form: 'SettingsForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(SettingsForm)
