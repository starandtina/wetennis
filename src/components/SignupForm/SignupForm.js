import React from 'react'

export class SignupForm extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  componentWillReceiveProps(nextProps) {
    // If `authenticated` then redirect to
    if(nextProps.user.status === 'authenticated' && nextProps.user.user) {
      const locationState = this.props.location.state

      this.props.actions.push(locationState && locationState.nextPathname || '/');
    }
  }

  render() {
    const {
      fields: { username, phone, name, gender, password, confirmPassword },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
    return (<form className='form-horizontal' onSubmit={handleSubmit(this.props.actions.signUpUser.bind(this))}>
        <div className={`form-group ${username.touched && username.invalid ? 'has-error' : ''}`}>
          <label className='col-xs-4 control-label'>用户名</label>
          <div className='col-xs-8'>
            <input className='form-control' type="text" placeholder="用户名" {...username}/>
            <div className="help-block">
              {username.touched ? username.error : ''}
            </div>
          </div>
        </div>
        <div className={`form-group ${phone.touched && phone.invalid ? 'has-error' : ''}`}>
          <label className='col-xs-4 control-label'>手机号</label>
          <div className='col-xs-8'>
            <input className='form-control' type="text" placeholder="Mobile phone" {...phone}/>
             <div className="help-block">
              {phone.touched ? phone.error : ''}
            </div>
          </div>
        </div>
        <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
          <label className='col-xs-4 control-label'>真实姓名</label>
          <div className='col-xs-8'>
            <input className='form-control' type="name" placeholder="真实姓名" {...name}/>
            <div className="help-block">
              {name.touched ? name.error : ''}
            </div>
          </div>
        </div>
        <div className={`form-group ${gender.touched && gender.invalid ? 'has-error' : ''}`}>
          <label className='col-xs-4 control-label'>性别</label>
          <div className='col-xs-8'>
            <label className='radio-inline'>
              <input type="radio" {...gender} value="male" checked={gender.value === 'male'}/> 男
            </label>
            <label className='radio-inline'>
              <input type="radio" {...gender} value="female" checked={gender.value === 'female'}/> 女
            </label>
          </div>
        </div>
        <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Password*</label>
          <input type="password" className="form-control" {...password} />
          <div className="help-block">
            {password.touched ? password.error : ''}
          </div>
        </div>
        <div className={`form-group ${confirmPassword.touched && confirmPassword.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Confirm Password*</label>
          <input type="password" className="form-control" {...confirmPassword} />
          <div className="help-block">
            {confirmPassword.touched ? confirmPassword.error : ''}
          </div>
        </div>
        <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
          <div className='col-xs-offset-4 col-xs-8'>
            <button type="submit" disabled={submitting}>
              {submitting ? <i/> : <i/>} 提交
            </button>
            <button type="button" disabled={submitting} onClick={resetForm}>
              清除
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default SignupForm
