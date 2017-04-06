import React from 'react'

import { TextField, SelectField } from 'redux-form-material-ui'
import Divider from 'material-ui/Divider'

export const renderSettingFormTextField = ({ input, meta: { touched, error }, label, labelClassName, ...custom }) => {
  return (
    <div className='row'>
      <label className={`control-label col-xs-4 ${labelClassName}`}>{label}</label>
      <div className='col-xs-8'>
        <TextField
          fullWidth
          hintText={label}
          errorText={touched && error}
          input={input}
          underlineShow={false}
          {...input}
          {...custom}
        />
      </div>
      <Divider />
    </div>
  )
}

export const renderTextField = ({ input, meta: { touched, error }, label, ...custom }) => {
  return (
    <div className='row form-group'>
      <label className='control-label col-xs-4' style={{lineHeight: '48px'}}>{label}</label>
      <div className='col-xs-8'>
        <TextField
          fullWidth
          hintText={label}
          errorText={touched && error}
          input={input}
          {...input}
          {...custom}
        />
      </div>
    </div>
  )
}

export const renderSelectField = ({ input, meta: { touched, error }, label, children, ...custom }) => (
   <div className='row form-group'>
    <label className='control-label col-xs-4' style={{'lineHeight': '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <SelectField
        fullWidth
        hintText={label}
        input={input}
        {...input}
        errorText={touched && error}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    </div>
  </div>
)
