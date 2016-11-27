import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

import { renderSelectField, renderTextField } from 'utils/form'

import cs from './TeamRegisterForm.scss'

const TeamRegisterForm = props => {
  const { handleSubmit, groups } = props

  return  <form className='form-horizontal' onSubmit={handleSubmit}>
    <Field name='groupName' component={renderSelectField} label='组别'>
      {groups.map( group => {
        return <MenuItem value={group.id} primaryText={group.name} />
      })}
    </Field>
    <Field name='name' component={renderTextField} label='团体名称'/>
    <Field name='coachName' component={renderTextField} label='教练'/>
  </form>
}

export default TeamRegisterForm
