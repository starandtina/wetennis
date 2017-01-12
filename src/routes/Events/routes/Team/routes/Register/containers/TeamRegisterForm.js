import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TeamRegisterForm from '../components/TeamRegisterForm'
import { getTeamRegisterFormInitialValues } from '../modules'
import { registerTeam } from '../modules/register'


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
  keepDirtyOnReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    const { registerTeam, members, groups, push, params: {eventId} } = props
    const { groupId } = values
    const group = groups.find( group => group.id === groupId)

    registerTeam({
      ...values,
      members,
    }).then(( { payload: { code, errorMsg, data } } = data) => {
      if (Number(code) === 0 && !errorMsg) {
        push(
          buildUrl(`/events/${eventId}/team/${data.teamId}/pay`, {
            payUrl: data.payUrl,
            price: group.price,
          })
        )
      }
    })
  }
})(TeamRegisterForm)

const mapStateToProps = state => {
  return {
    initialValues: getTeamRegisterFormInitialValues(state.register)
  }
}

export default connect(
  mapStateToProps,
  {
    registerTeam,
  },
)(form)
