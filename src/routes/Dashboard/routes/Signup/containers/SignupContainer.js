import React from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'

import { signUpUser } from 'routes/Dashboard/modules/user'
import SignupForm from 'components/SignupForm'


export const fields = ['username', 'phone', 'name', 'gender', 'password', 'confirmPassword']

const validate = (values) => {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;
  }
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if(!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if(!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if(values.confirmPassword  && values.confirmPassword.trim() !== '' && values.password  && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }
   return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user,
  initialValues: state.user.initialValues
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ signUpUser, push }, dispatch)
})

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'SignupForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(SignupForm)
