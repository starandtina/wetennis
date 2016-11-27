import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TeamMemberForm from '../components/TeamMemberForm'
import { getTeamMemberFormInitialValues } from '../modules'

const fields = ['name', 'gender', 'identify', 'idNumber',  'isBench']

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'idNumber']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填项'
    }
  })

  return errors
}

let form = reduxForm({
  form: 'TeamMemberForm',
  validate
})(TeamMemberForm)

const mapStateToProps = (state) => ({
  initialValues: getTeamMemberFormInitialValues(state.register, fields)
})

export default connect(
  mapStateToProps,
)(form)

