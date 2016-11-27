import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

import { renderSelectField, renderTextField } from 'utils/form'

import cs from './TeamMemberForm.scss'

const TeamMemberForm = props => {
  const { handleSubmit, onCancel, pristine, reset, submitting } = props

  return  <div className={`${cs['team-member-form']} container`}>
    <form className='form-horizontal' onSubmit={handleSubmit}>
      <Field name='name' component={renderTextField} label='姓名'/>
      <Field name='gender' component={renderSelectField} label='性别'>
        <MenuItem value='male' primaryText='男'/>
        <MenuItem value='female' primaryText='女'/>
      </Field>
      <Field name='identify' component={renderSelectField} label='证件'>
        <MenuItem value='identifyCard' primaryText='身份证'/>
        <MenuItem value='passport' primaryText='护照'/>
      </Field>
      <Field name='idNumber' component={renderTextField} label='证件号'/>
      <Field name='isBench' component={renderSelectField} label='是否替补'>
        <MenuItem value={true} primaryText='是'/>
        <MenuItem value={false} primaryText='否'/>
      </Field>
      <div className='text-right'>
        <button className='btn u-marginRight5' type='button' onClick={onCancel}>取消</button>
        <button className='btn btn-success' type='submit' disabled={pristine}>保存</button>
      </div>
    </form>
  </div>
}

export default TeamMemberForm
