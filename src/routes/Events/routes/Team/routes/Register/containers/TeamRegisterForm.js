import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'

import TeamRegisterForm from '../components/TeamRegisterForm'

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'gener', 'idNumber', 'isBench']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

export default reduxForm({
  form: 'TeamRegisterForm',
  validate
})(TeamRegisterForm)
