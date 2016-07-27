import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-bootstrap'
import classes from './ResetPasswordContainer.scss'

import { resetPassword, checkActivationCode } from 'routes/Dashboard/modules/user'

export const fields = ['phone', 'password', 'activationCode']

const validate = (values) => {
  var errors = {};
  var hasErrors = false;
  if(!values.password || values.password.trim() === '') {
    errors.password = '请输入新密码';
    hasErrors = true;
  }
  if(!values.phone || values.phone.trim() === '') {
    errors.phone = '请输入手机号';
    hasErrors = true;
  }
  if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
    errors.phone = '请输入正确的手机号'
    hasErrors = true
  }
  if(!values.activationCode || values.activationCode.trim() === '') {
    errors.activationCode = '请输入验证码';
    hasErrors = true;
  }
   return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user,
  initialValues: state.user.initialValues,
  userNameDuplicated: state.user.userNameDuplicated,
  phoneDuplicated: state.user.phoneDuplicated
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    resetPassword,
    checkActivationCode,
    push,
  }, dispatch)
})

export class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  state = {
    buttonSuspending: false,
    leftTime: 60,
    Tip: '验证',
  };

  resetPassword = () => {
    const { resetPassword, values, push } = this.props;
    console.log(values);
    resetPassword(values).then(action => {
      console.log(action);
      if(action.payload.data.resetPassword){
        alert('修改成功');
      }
    });
  };

  render () {
    const {
      fields: { password, phone, activationCode },
      handleSubmit,
      submitting,
      } = this.props;

    const style = {
      width: '100%'
    };

    const sendactivationCode = () => {
      const { checkActivationCode, fields: { phone } } = this.props;
      checkActivationCode({phone: +phone.value});
      this.setState({
        buttonSuspending: true,
        Tip: 60,
      })
      window.startTiming = () => {
        let time = this.state.Tip - 1;
        this.setState({
          Tip: time,
        })
        if(time < 1){
          clearInterval(window.thisEvent);
          this.setState({
            buttonSuspending: false,
            Tip: '验证',
          })
        }
      }
      window.thisEvent = setInterval("startTiming()", 1000);
    };
    return (
      <form className='registration-form' onSubmit={handleSubmit(this.resetPassword)}>
        <Grid>
          <Row>
            <Col xs={8}>
              <TextField
                style={style}
                hintText="手机号"
                errorText={phone.touched ? phone.error : ''}
                floatingLabelText="手机号"
                {...phone}
                onBlur={this.checkPhone}
              />
            </Col>
            <Col xs={4}>
              <RaisedButton
                style={{'marginTop': '28px'}}
                label={this.state.Tip}
                disabled={this.state.buttonSuspending}
                onClick={sendactivationCode}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="验证码"
                errorText={activationCode.touched ? activationCode.error : ''}
                floatingLabelText="验证码"
                {...activationCode}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="密码"
                errorText={password.touched ? password.error : ''}
                floatingLabelText="密码"
                {...password}
              />
            </Col>
          </Row>
        </Grid>
        <div className='button-groups clearfix'>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className="btn btn-default btn-lg btn-block" disabled={submitting}>确认修改</button>
        </div>
      </form>
    )
  }
}
export default reduxForm({
  form: 'ResetPasswordForm',
  fields,
  validate
}, mapStateToProps, {
  resetPassword,
  checkActivationCode,
  push,
})(ResetPasswordForm)
