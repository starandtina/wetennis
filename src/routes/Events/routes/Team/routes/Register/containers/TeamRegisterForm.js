import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TeamRegisterForm from '../components/TeamRegisterForm'
import { getTeamRegisterFormInitialValues } from '../modules'

const validate = (values = {}) => {
  const errors = {}
  const requiredFields = ['name', 'groupId', 'coachName']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填项'
    }
  })

  return errors
}

const form = reduxForm({
  form: 'TeamRegisterForm',
  validate,
  enableReinitialize: true,
})(TeamRegisterForm)

const mapStateToProps = state => {
  return {
    initialValues: getTeamRegisterFormInitialValues(state.register)
  }
}

export default connect(
  mapStateToProps,
)(form)
