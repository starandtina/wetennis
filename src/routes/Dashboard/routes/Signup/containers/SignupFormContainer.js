import React from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'

import { signUpUserThenSetCookie, verifyPhone, checkPhoneDuplicated, checkUserNameDuplicated } from 'routes/Dashboard/modules/user'
import SignupForm from 'components/SignupForm'


export const fields = ['username', 'phone', 'password', 'activationCode']

const validate = (values) => {
  var errors = {};
  var hasErrors = false;

  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if(!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if(!values.phone || values.phone.trim() === '') {
    errors.phone = 'Enter phone';
    hasErrors = true;
  }
  if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
    errors.phone = '请输入正确的手机号'
    hasErrors = true
  }
  if(!values.activationCode || values.activationCode.trim() === '') {
    errors.activationCode = 'Enter Code';
    hasErrors = true;
  }
   return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user,
  initialValues: state.user.initialValues,
  usernameDuplicated: state.user.usernameDuplicated,
  phoneDuplicated: state.user.phoneDuplicated
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    signUpUserThenSetCookie,
    verifyPhone,
    push,
    checkUserNameDuplicated,
    checkPhoneDuplicated
  }, dispatch)
})

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'SignupForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(SignupForm)
