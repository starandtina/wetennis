import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { uploadUserInfo } from '../../../modules/register';

import RegisterConfirmation from '../components/RegisterConfirmation'

const partnerFields = ['usernameForPartner', 'genderForPartner', 'nameForPartner', 'phoneForPartner']

const mapStateToProps = state => {
  const partner = state.partner && state.partner.partner
  const partnerInitialValues = {}
  const formValues = getFormValues('registerConfirmForm')(state)

  if (partner) {
    partnerFields.forEach(f => {
      partnerInitialValues[f] = partner[f.replace('ForPartner', '')]
    })
  }

  return {
    user: state.user.user,
    group: state.register.group,
    item: state.register.item,
    partner,
    initialValues: {
      ...state.user.user,
      ...partnerInitialValues,
      ...formValues,
    },
    formValues: formValues,
  }
}

const mapDispatchToProps = { uploadUserInfo, push };

const validate = (values, props) => {
  const { restriction = {}, needPartner } = props.item
  const errors = {}
  let hasErrors = false

  if (!values.username || values.username.trim() === '') {
    errors.username = '请输入用户名';
    hasErrors = true;
  }

  if (!values.name || values.name.trim() === '') {
    errors.name = '请输入姓名';
    hasErrors = true;
  }

  if (!values.phone || values.phone.trim() === '') {
    errors.phone = '请输入手机号码';
    hasErrors = true;
  }

  if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
    errors.phone = '请输入正确的手机号'
    hasErrors = true
  }

  // Validation for ID & age
  if (!values.cardId || values.cardId.trim() === '') {
    if(!values.passport || values.passport.trim() === ''){
      errors.cardId = '请输入身份证号或护照';
      hasErrors = true;
    }
  } else {
    if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(values.cardId)) {
      errors.cardId = '请输入正确身份证号(15位或18位数字)';
      hasErrors = true;
    } else {
      const {
        age,
        userGender
      } = pullAgeAndGenderFromCardId(values.cardId)

      if (age > restriction.maxAge || age < restriction.minAge) {
        errors.cardId = `年龄不符合报名条件（${restriction.minAge} - ${restriction.maxAge}）`;
        hasErrors = true;
      }

      if (restriction.isMixedPair) {
        const userPartner = props.partner
        if (userGender == userPartner.gender) {
          errors.cardId = '混双性别不符合报名条件';
          hasErrors = true;
        }
      } else if (restriction.gender && (userGender !== restriction.gender)) {
        errors.cardId = `性别不符合报名条件（要求为${restriction.gender === 'male' ? '男性' : '女性'}）`;
        hasErrors = true;
      }
      
      if (userGender != values.gender) {
        errors.cardId = '身份证同个人信息性别不一致';
        hasErrors = true;
      }

      // If we need the partner, then the total amount of age should be greater than `restriction.minAmountAge`
      if (needPartner) {
        const {
          minAmountAge
        } = restriction
        const partner = props.partner

        if (age + Number(partner.age) < minAmountAge) {
          errors.cardId = `您（${parseInt(age)}）与您搭档（${partner.age}）的年龄和不满足年龄条件（${minAmountAge}）`
          hasErrors = true
        }

        // 混双限制
        if (partner.gender) {
          if (restriction.isMixedPair && values.gender === partner.gender) {
            errors.gender = `性别不符合报名条件（要求为${restriction.gender === 'male' ? '男性' : '女性'}）`;
            hasErrors = true;
          }

          // 男双，女双限制
          if (!restriction.isMixedPair &&
            (restriction.gender !== values.gender ||
              values.gender !== partner.gender)
          ) {
            errors.gender = `双打性别不符合报名条件（要求为${restriction.gender === 'male' ? '男性' : '女性'}）`;
            hasErrors = true;
          }
        }
      }
    }
  }

  return hasErrors && errors;
}

/**
* 15位身份证号码：第7、8位为出生年份(两位数)，第9、10位为出生月份，第11、12位代表出生日期，第15位代表性别，奇数为男，偶数为女。 
*
* 18位身份证号码：第7、8、9、10位为出生年份(四位数)，第11、第12位为出生月份，第13、14位代表出生日期，第17位代表性别，奇数为男，偶数为女。
*/
const pullAgeAndGenderFromCardId = (cardId = '') => {
  const cardIdLength = cardId.length
  let birthOfYear = Number(cardId.substring(6, 10))
  let birthOfMonth = Number(cardId.substring(10, 12))
  let birthOfDay = Number(cardId.substring(12, 14))
  let cardIdGender = cardId[(cardIdLength - 2)]

  if (cardIdLength === 15) {
    birthOfYear = Number(cardId.substring(6, 8))
    birthOfMonth = Number(cardId.substring(8, 10))
    birthOfDay = Number(cardId.substring(10, 12))
    cardIdGender = cardId[(cardIdLength - 1)]
  }

  const age = (Date.now() - new Date(birthOfYear, birthOfMonth - 1, birthOfDay)) / (365 * 24 * 60 * 60 * 1000)
  const userGender = cardIdGender % 2 === 0 ? 'female' : 'male'

  return {
    age,
    userGender
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'registerConfirmForm',
  validate
})(RegisterConfirmation));
