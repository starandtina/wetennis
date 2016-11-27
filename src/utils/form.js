import React from 'react'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
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

export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
   <div className='form-group'>
    <label className='control-label col-xs-4' style={{'lineHeight': '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <SelectField
        fullWidth
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    </div>
  </div>
)
