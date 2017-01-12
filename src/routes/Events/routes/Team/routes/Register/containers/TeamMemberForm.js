import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TeamMemberForm from '../components/TeamMemberForm'
import { getTeamMemberFormInitialValues } from '../modules'
import { saveTeamMember } from '../modules/teamMember'


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

const form = reduxForm({
  form: 'TeamMemberForm',
  validate,
  onSubmit: () => {
    const { saveTeamMember, currentEditingTeamMember } = props
    const { identify, idNumber } = values

    saveTeamMember({
      ...values,
      [identify]: idNumber,
      id: currentEditingTeamMember && currentEditingTeamMember.id ||　uuid()
    })
  }
})(TeamMemberForm)

const mapStateToProps = (state) => ({
  initialValues: getTeamMemberFormInitialValues(state.register, fields)
})

export default connect(
  mapStateToProps,
  {
    saveTeamMember,
  },
)(form)

