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

  return errors
}

export default reduxForm({
  form: 'TeamRegisterForm',
  validate
})(TeamRegisterForm)
