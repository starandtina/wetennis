import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'

import TeamMemberForm from '../components/TeamMemberForm'

const validate = values => {
  const errors = {}
  const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'notes']
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
  form: 'TeamMemberForm',
  validate,
  initialValues: {
    gender: 'male',
    identify: 'identifyCard',
    isBench: false
  }
})(TeamMemberForm)
