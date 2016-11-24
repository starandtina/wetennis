import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import cs from './TeamMemberForm.scss'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div className='form-group'>
    <label className='control-label col-xs-4' style={{lineHeight: '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <TextField
        fullWidth
        hintText={label}
        errorText={error}
        {...input}
        {...custom}
      />
    </div>
  </div>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
   <div className='form-group'>
    <label className='control-label col-xs-4' style={{'lineHeight': '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <SelectField
        fullWidth
        errorText={error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    </div>
  </div>
)

const TeamMemberForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  return  <div className={`${cs['team-member-form']} container`}>
    <form className='form-horizontal' onSubmit={handleSubmit}>
      <Field name='name' component={renderTextField} label='姓名'/>
      <Field name='gender' component={renderSelectField} label='性别'>
        <MenuItem value={'male'} primaryText='男'/>
        <MenuItem value={'female'} primaryText='女'/>
      </Field>
      <Field name='identify' component={renderSelectField} label='证件'>
        <MenuItem value={'identifyCard'} primaryText='身份证'/>
        <MenuItem value={'password'} primaryText='护照'/>
      </Field>
      <Field name='idNumber' component={renderTextField} label='证件号'/>
      <Field name='isBench' component={renderSelectField} label='是否替补'>
        <MenuItem value={true} primaryText='是'/>
        <MenuItem value={false} primaryText='否'/>
      </Field>
      <div className='text-right'>
        <button className='btn u-marginRight5' type='button' disabled={pristine}>取消</button>
        <button className='btn btn-success' type='submit' disabled={pristine}>保存</button>
      </div>
    </form>
  </div>
}

export default TeamMemberForm
