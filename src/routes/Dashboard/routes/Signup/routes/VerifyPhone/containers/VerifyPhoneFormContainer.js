import React from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'

import { verifyPhone } from 'routes/Dashboard/modules/user'
import VerifyPhoneForm from 'components/VerifyPhoneForm'


export const fields = ['phone', 'code']

const validate = (values) => {
  var errors = {};
  var hasErrors = false;

  if (!values.phone || values.phone.trim() === '') {
    errors.phone = '请输入手机号'
    hasErrors = true
  }

  if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
    errors.phone = '请输入正确的手机号'
     hasErrors = true
  }

  if(!values.code || values.code.trim() === '') {
    errors.code = '请输入验证码'
    hasErrors = true
  }

  return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ verifyPhone, push }, dispatch)
})

export default reduxForm({
  form: 'VerifyPhoneForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(VerifyPhoneForm)
