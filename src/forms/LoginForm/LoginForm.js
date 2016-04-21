import React from 'react'
import { reduxForm } from 'redux-form'

export const fields = [ 'firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}
export class Login extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  render() {
    const {
      fields: { firstName, lastName, email, sex, favoriteColor, employed, notes },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
    return (<form className='form-horizontal' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>First Name</label>
          <div className='col-xs-8'>
            <input className='form-control' type="text" placeholder="First Name" {...firstName}/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>Last Name</label>
          <div className='col-xs-8'>
            <input className='form-control' type="text" placeholder="Last Name" {...lastName}/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>Email</label>
          <div className='col-xs-8'>
            <input className='form-control' type="email" placeholder="Email" {...email}/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>Sex</label>
          <div className='col-xs-8'>
            <label className='radio-inline'>
              <input type="radio" {...sex} value="male" checked={sex.value === 'male'}/> Male
            </label>
            <label className='radio-inline'>
              <input type="radio" {...sex} value="female" checked={sex.value === 'female'}/> Female
            </label>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>Favorite Color</label>
          <div className='col-xs-8'>
            <select
              {...favoriteColor}
              // required syntax for reset form to work
              // undefined will not change value to first empty option
              // when resetting
              value={favoriteColor.value || ''}>
              <option></option>
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>
            <input className='form-control' type="checkbox" {...employed}/> Employed
          </label>
        </div>
        <div className='form-group'>
          <label className='col-xs-4 control-label'>Notes</label>
          <div className='col-xs-8'>
            <textarea
              {...notes}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={notes.value || ''}/>
          </div>
        </div>
        <div className='form-group'>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

Login = reduxForm({
  form: 'Login',
  fields,
  validate
})(Login)

export default Login
