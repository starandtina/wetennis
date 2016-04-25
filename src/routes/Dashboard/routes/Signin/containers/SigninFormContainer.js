import React from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { signInUser } from 'routes/Dashboard/modules/user'
import SigninForm from 'components/SigninForm'


export const fields = ['username', 'password']

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

  return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ signInUser }, dispatch)
})

export default reduxForm({
  form: 'SigninForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(SigninForm)
