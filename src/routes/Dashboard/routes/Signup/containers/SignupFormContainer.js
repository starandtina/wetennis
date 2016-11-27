import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { reduxForm, getFormValues, getFormSyncErrors } from 'redux-form'

import {
  signUpUserThenSetCookie,
  verifyPhone,
  checkPhoneDuplicated,
  checkUserNameDuplicated,
  sendActivationCode
} from 'routes/Dashboard/modules/user'
import SignupForm from 'components/SignupForm'

const validate = values => {
  var errors = {};
  var hasErrors = false;
  if (!values.username || values.username.trim() === '') {
    errors.username = '请输入用户名';
    hasErrors = true;
  }
  if(!values.password || values.password.trim() === '') {
    errors.password = '请输入密码';
    hasErrors = true;
  }
  if(!values.phone || values.phone.trim() === '') {
    errors.phone = '请输入手机号码';
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
  if (blurredField === 'username') {
    return dispatch(checkUserNameDuplicated(values.userName)).then(action => {
      if (action.payload.data.userNameDuplicated) {
        throw { username: '用户名重复', hidenErrorBar: true }
      }
    });
  }
  if (blurredField === 'phone') {
    return dispatch(checkPhoneDuplicated(values.phone)).then(action => {
      if (action.payload.data.phoneDuplicated) {
        throw ({ 'phone': '电话号码重复', hidenErrorBar: true })
      }
    });
  }
  return new Promise((resolve, reject) => resolve());
};

const mapStateToProps = (state) =>  ({
  user: state.user,
  initialValues: state.user.initialValues,
  userNameDuplicated: state.user.userNameDuplicated,
  phoneDuplicated: state.user.phoneDuplicated,
  formValues: getFormValues('SignupForm')(state),
  theSyncErrors: getFormSyncErrors('SignupForm')(state),
});

const mapDispatchToProps = {
    signUpUserThenSetCookie,
    verifyPhone,
    sendActivationCode,
    push,
    checkUserNameDuplicated,
    checkPhoneDuplicated
};

const MyForm = reduxForm({
  form: 'SignupForm',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username', 'phone' ]
})(SignupForm);

export default connect(mapStateToProps, mapDispatchToProps)(MyForm)
