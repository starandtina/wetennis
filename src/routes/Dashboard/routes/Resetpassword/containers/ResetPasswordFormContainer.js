import React, { Component } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { reduxForm, getFormValues, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-bootstrap'
import { resetPassword, checkPhoneDuplicated, sendActivationCode } from 'routes/Dashboard/modules/user'

const validate = values => {
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
};

const asyncValidate = (values, dispatch, props, blurredField) => {
  if (blurredField === 'phone') {
    return dispatch(checkPhoneDuplicated({
      phone: values.phone
    })).then(action => {
      if (action.payload.data.phoneDuplicated) {
        throw ({
          'phone': '电话号码重复',
          hidenErrorBar: true
        })
      }
    })
  }

  return new Promise((resolve, reject) => resolve());
};

const mapStateToProps = (state) => ({
  user: state.user,
  initialValues: state.user.initialValues,
  userNameDuplicated: state.user.userNameDuplicated,
  phoneDuplicated: state.user.phoneDuplicated,
  formValues: getFormValues('ResetPasswordForm')(state)
});

const mapDispatchToProps = {
  resetPassword,
  sendActivationCode,
  push,
};

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

  resetPassword = () => {
    const { resetPassword, formValues, push } = this.props;
    resetPassword(formValues).then(action => {
      if(action.payload.data.resetPassword){
        push('/dashboard/signin')
      }
    })
  }
  
  sendActivationCode = () => {
    const {
      sendActivationCode,
      formValues,
    } = this.props
    
    sendActivationCode({
      phone: formValues.phone
    }).then(() => {
      this.setState({
        buttonSuspending: true,
        Tip: 180,
      })

      window.startTiming = () => {
        let time = this.state.Tip - 1;
        
        this.setState({
          Tip: time
        })
        
        if (time < 1) {
          clearInterval(window.thisEvent);
          this.setState({
            buttonSuspending: false,
            Tip: '发送',
          })
        }
      }

      window.thisEvent = setInterval("startTiming()", 1000)
    })
  };

  render () {
    const {
      handleSubmit,
      submitting,
      } = this.props;

    const style = {
      width: '100%'
    };

    return (
      <form className='form' onSubmit={handleSubmit(this.resetPassword)}>
        <Row>
          <Col xs={8}>
            <Field
              name="phone"
              component={TextField}
              style={style}
              hintText="手机号"
              floatingLabelText="手机号"
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
            <Field
              name="activationCode"
              component={TextField}
              style={style}
              hintText="验证码"
              floatingLabelText="验证码"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              name="password"
              type="password"
              component={TextField}
              style={style}
              hintText="密码"
              floatingLabelText="密码"
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

const MyForm = reduxForm({
  form: 'ResetPasswordForm',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'phone' ]
})(ResetPasswordForm);

export default connect(mapStateToProps, mapDispatchToProps)(MyForm)
