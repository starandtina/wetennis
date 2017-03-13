import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TeamRegisterForm from '../components/TeamRegisterForm'
import { getTeamRegisterFormInitialValues } from '../modules'
import { registerTeam } from '../modules/register'
import { buildUrl } from 'utils'
import { WETENNIS_URL } from 'utils/url'

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
    const redirectUrl = `${WETENNIS_URL}/events/${eventId}`

    registerTeam({
      ...values,
      members,
    }).then(( { payload: { code, errorMsg, data } } = data) => {
      if (code !== 0) {
        return
      }

      if (parseFloat(group.price) === 0 || !data.payUrl) {
        location.replace(redirectUrl)
      } else {
        location.replace(
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
