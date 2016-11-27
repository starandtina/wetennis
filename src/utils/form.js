import React from 'react'

import { TextField, SelectField } from 'redux-form-material-ui'

export const renderTextField = ({ input, meta, label, ...custom }) => (
  <div className='form-group'>
    <label className='control-label col-xs-4' style={{lineHeight: '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <TextField
        fullWidth
        hintText={label}
        input={input}
        meta={meta}
        {...custom}
      />
    </div>
  </div>
)

export const renderSelectField = ({ input, meta, label, children, ...custom }) => (
   <div className='form-group'>
    <label className='control-label col-xs-4' style={{'lineHeight': '48px'}}>{label}</label>
    <div className='col-xs-8'>
      <SelectField
        fullWidth
        hintText={label}
        input={input}
        meta={meta}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    </div>
  </div>
)
