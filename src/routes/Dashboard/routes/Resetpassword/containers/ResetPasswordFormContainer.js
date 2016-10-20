import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-bootstrap'

import { resetPassword, checkPhoneDuplicated, sendActivationCode } from 'routes/Dashboard/modules/user'

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
    sendActivationCode,
    push
  }, dispatch)
})

export class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  state = {
    buttonSuspending: false,
    leftTime: 180,
    Tip: '发送',
  }

  checkPhone = () => {
    const { checkPhoneDuplicated, fields: { phone } } = this.props;
    phone && phone.onBlur();
    checkPhoneDuplicated({
      "phone": +phone.value
    })
  }

  resetPassword = () => {
    const { resetPassword, values, push } = this.props;
    resetPassword(values).then(action => {
      if(action.payload.data.resetPassword){
        push('/dashboard/signin')
      }
    })
  }
  
  sendActivationCode = () => {
    const {
      sendActivationCode,
      fields: {
        phone
      }
    } = this.props
    
    sendActivationCode({
      phone: +phone.value
    })
    
    this.setState({
      buttonSuspending: true,
      Tip: 180,
    })
    
    window.startTiming = () => {
      let time = this.state.Tip - 1;
      this.setState({
        Tip: time,
      })
      if (time < 1) {
        clearInterval(window.thisEvent);
        this.setState({
          buttonSuspending: false,
          Tip: '发送',
        })
      }
    }

    window.thisEvent = setInterval("startTiming()", 1000);
  }

  render () {
    const {
      fields: { password, phone, activationCode },
      phoneDuplicated,
      handleSubmit,
      submitting,
      } = this.props;

    const style = {
      width: '100%'
    }

    if(!phone.error && !phoneDuplicated){
      phone.error = '电话号码不存在';
    }

    return (
      <form className='form' onSubmit={handleSubmit(this.resetPassword)}>
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
            <button
              style={{marginTop: '28px'}}
              className='btn btn-default btn-block btn-transparent'
              disabled={this.state.buttonSuspending}
              onClick={this.sendActivationCode}>
              {this.state.Tip}
            </button>
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
              type='password'
              style={style}
              hintText="密码"
              errorText={password.touched ? password.error : ''}
              floatingLabelText="密码"
              {...password}
            />
          </Col>
        </Row>
        <div className='button-groups clearfix'>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className="btn btn-default btn-submit btn-lg btn-block" disabled={submitting}>确认修改</button>
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
  checkPhoneDuplicated,
  sendActivationCode,
  push,
})(ResetPasswordForm)
