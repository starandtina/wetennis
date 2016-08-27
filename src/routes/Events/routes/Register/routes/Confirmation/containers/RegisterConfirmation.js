import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { uploadUserInfo } from '../../../modules/register';

import RegisterConfirmation from '../components/RegisterConfirmation'

const mapStateToProps = (state) => {
  return ({
  user: state.user.user,
  group: state.register.group,
  item: state.register.item,
  partnerId: state.register.partnerId,
  partners: state.register.partners,
  initialValues: state.user.user
})}

const mapDispatchToProps = (dispatch) => bindActionCreators({ uploadUserInfo, push }, dispatch);

const validate = (values, props) => {
  const restriction = props.item.restriction;
  var errors = {};
  var hasErrors = false;

  if (!values.username || values.username.trim() === '') {
    errors.username = '请输入用户名';
    hasErrors = true;
  }
  if(!values.name || values.name.trim() === '') {
    errors.name = '请输入姓名';
    hasErrors = true;
  }
  if(!values.phone || values.phone.trim() === '') {
    errors.phone = '请输入手机号码';
    hasErrors = true;
  }

  if(!restriction.isMixedPair && values.gender !== restriction.gender) {
    console.log(values.gender, restriction.gender);
    errors.gender = '性别不符合报名条件';
    hasErrors = true;
  }
  if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
    errors.phone = '请输入正确的手机号'
    hasErrors = true
  }

  if(!values.cardId || values.cardId.trim() === '') {
    errors.cardId = '请输入身份证号';
    hasErrors = true;
  } else if (values.cardId.length !== 15 && values.cardId.length !== 18 ) {
    console.log(values.cardId.length);
    errors.cardId = '请输入正确身份证号';
    hasErrors = true;
  } else if (values.cardId.length === 18) {
    const birthYear = Number(values.cardId.substring(6, 10))
    const age = (new Date()).getFullYear() - birthYear;
    const userGender = Number(values.cardId[16]) % 2 == 0 ? 'female' : 'male';
    if (age > restriction.maxAge || age < restriction.minAge) {
      errors.cardId = '年龄不满足不符合报名条件';
      hasErrors = true;
    }
    if (restriction.isMixedPair) {
      const userPartner = props.partners.find(partner => partner.id === props.partnerId)
      if (userGender == userPartner.gender) {
        errors.cardId = '混双性别不符合报名条件';
        hasErrors = true;
      }
    } else if (restriction.gender && (userGender !== restriction.gender)) {
      errors.cardId = '性别不符合报名条件';
      hasErrors = true;
    }
    if (userGender != values.gender) {
      errors.cardId = '身份证同个人信息性别不一致';
      hasErrors = true;
    }
  } else if (values.cardId.length === 15) {
    const birthYear = Number(values.cardId.substring(6,10))
    const age = (new Date()).getFullYear() - birthYear;
    const userGender = Number(values.cardId[13])%2 == 0 ? 'female' : 'male';
    if (age > restriction.maxAge || age < restriction.minAge) {
      errors.cardId = '年龄不满足不符合报名条件';
      hasErrors = true;
    }
    if (restriction.isMixedPair) {
      const userPartner = props.partners.find(partner => partner.id === props.partnerId)
      if(userGender == userPartner.gender) {
        errors.cardId = '混双性别不符合报名条件';
        hasErrors = true;
      }
    } else if (restriction.gender && (userGender !== restriction.gender)) {
      errors.cardId = '性别不符合报名条件';
      hasErrors = true;
    }
  }

  return hasErrors && errors;
};

// Wrap the component to inject dispatch and state into it
export default reduxForm(
  {
    form: 'registerConfirmForm',
    fields: ['username', 'gender', 'name', 'phone', 'cardId'],
    validate,
  },
  mapStateToProps,
  mapDispatchToProps
)(RegisterConfirmation)
