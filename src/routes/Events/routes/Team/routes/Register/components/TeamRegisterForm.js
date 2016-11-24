import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'

import cs from './TeamRegisterForm.scss'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div className='form-group'>
    <label className='control-label col-xs-4' style={{lineHeight: '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <TextField
        fullWidth
        hintText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </div>
  </div>
)

const TeamRegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, adding } = props

  return  <form className='form-horizontal' onSubmit={handleSubmit}>
    <Field name='groupName' component={renderTextField} label='组别' />
    <Field name='name' component={renderTextField} label='团体名称'/>
    <Field name='coachName' component={renderTextField} label='教练'/>
  </form>
}

export default TeamRegisterForm
