import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

import { renderSelectField, renderTextField } from 'utils/form'

import classes from './RegisterConfirmation.scss'

export class RegisterConfirmation extends PureComponent {
  state = {
    ...this.props.user,
  }

  uploadUserInfo = () => {
    const { uploadUserInfo, push, params, formValues } = this.props
    const eventId = params.eventId
    const { name, username, gender, cardId, passport, phone } = formValues

    if (name && username && gender && (cardId || passport) && phone) {
      uploadUserInfo(formValues);
      push(`/events/${eventId}/register/announcement`)
    } else {
      alert('请完整填写信息')
    }
  }

  render() {
    const { group, item, partnerId, partners, handleSubmit } = this.props

    const partnerContent = item.needPartner ? (
      <div>
        <div className={`${classes.header} text-muted`}>搭档信息</div>
        <Field name='usernameForPartner' label='用户名' disabled component={renderTextField} />
        <Field name='genderForPartner' label='性别' disabled component={renderSelectField}>
          <MenuItem value='null' primaryText='未知' />
          <MenuItem value='male' primaryText='男' />
          <MenuItem value='female' primaryText='女' />
        </Field>
        <Field name='nameForPartner' label='真实姓名' disabled component={renderTextField} />
        <Field name='phoneForPartner' label='电话' disabled component={renderTextField} />
      </div>
    ) : null

    return <div className={`{classes.Root} container`}>
      <div className={`${classes.header} text-muted`}>
        <h2>{group.name}</h2>
        <h4>{item.name}</h4>
      </div>
      <form className={`${classes.UserInfo} form-horizontal`} onSubmit={handleSubmit(this.uploadUserInfo)}>
        <Field name='username' label='用户名' component={renderTextField} />
        <Field name='gender' label='性别' component={renderSelectField}>
          <MenuItem value='male' primaryText='男' />
          <MenuItem value='female' primaryText='女' />
        </Field>
        <Field name='name' label='真实姓名' component={renderTextField} />
        <Field name='phone' label='电话' component={renderTextField} />
        <Field name='cardId' label='身份证号' component={renderTextField} />
        <Field name='passport' label='护照' component={renderTextField} />
        <Field name='companyName' label='工作单位' component={renderTextField} />
        <Field name='companyTitle' label='职务' component={renderTextField} />
        <Field name='club' label='所属俱乐部' component={renderTextField} />
        {partnerContent}
        <div className={`button-groups clearfix ${classes.ButtonGroups}`}>
          <button type='submit' className='btn btn-primary btn-lg btn-block'>确认报名信息</button>
        </div>
      </form>
    </div>
  }
}

export default RegisterConfirmation

