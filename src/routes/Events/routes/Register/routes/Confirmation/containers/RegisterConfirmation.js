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

  if (!restriction.isMixedPair && values.gender !== restriction.gender) {
    errors.gender = `性别不符合报名条件（要求为${restriction.gender === 'male' ? '男性' : '女性'}）`
    hasErrors = true;
  }

  if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
    errors.phone = '请输入正确的手机号'
    hasErrors = true
  }

  // Validation for ID & age
  if (!values.personCard || values.personCard.trim() === '') {
    if(!values.passport || values.passport.trim() === ''){
      errors.personCard = '请输入身份证号或护照';
      hasErrors = true;
    }
  } else {
    if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(values.personCard)) {
      errors.personCard = '请输入正确身份证号(15位或18位数字)';
      hasErrors = true;
    } else {
      const {
        age,
        userGender
      } = pullAgeAndGenderFromCardId(values.personCard)

      if (age > restriction.maxAge || age < restriction.minAge) {
        errors.personCard = `年龄不符合报名条件（${restriction.minAge} - ${restriction.maxAge}）`;
        hasErrors = true;
      }

      if (restriction.isMixedPair) {
        const userPartner = props.partners.find(partner => partner.id === props.partnerId)
        if (userGender == userPartner.gender) {
          errors.personCard = '混双性别不符合报名条件';
          hasErrors = true;
        }
      } else if (restriction.gender && (userGender !== restriction.gender)) {
        errors.personCard = `性别不符合报名条件（要求为${restriction.gender === 'male' ? '男性' : '女性'}）`;
        hasErrors = true;
      }
      
      if (userGender != values.gender) {
        errors.personCard = '身份证同个人信息性别不一致';
        hasErrors = true;
      }

      // If we need the partner, then the total amount of age should be greater than `restriction.minAmountAge`
      if (needPartner) {
        const {
          minAmountAge
        } = restriction
        const partner = props.partners.find(partner => partner.id === props.partnerId)

        if (age + partner.age < minAmountAge) {
          errors.personCard = `您（${parseInt(age)}）与您搭档（${partner.age}）的年龄和不满足年龄条件（${minAmountAge}）`
          hasErrors = true
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
const pullAgeAndGenderFromCardId = (personCard = '') => {
  const personCardLength = personCard.length
  let birthOfYear = Number(personCard.substring(6, 10))
  let birthOfMonth = Number(personCard.substring(10, 12))
  let birthOfDay = Number(personCard.substring(12, 14))
  let personCardGender = personCard[(personCardLength - 2)]

  if (personCardLength === 15) {
    birthOfYear = Number(personCard.substring(6, 8))
    birthOfMonth = Number(personCard.substring(8, 10))
    birthOfDay = Number(personCard.substring(10, 12))
    personCardGender = personCard[(personCardLength - 1)]
  }

  const age = (Date.now() - new Date(birthOfYear, birthOfMonth - 1, birthOfDay)) / (365 * 24 * 60 * 60 * 1000)
  const userGender = personCardGender % 2 === 0 ? 'female' : 'male'

  return {
    age,
    userGender
  }
}
// Wrap the component to inject dispatch and state into it
export default reduxForm(
  {
    form: 'registerConfirmForm',
    fields: ['username', 'gender', 'name', 'phone', 'personCard', 'passport', 'companyName', 'companyTitle', 'club'],
    validate,
  },
  mapStateToProps,
  mapDispatchToProps
)(RegisterConfirmation)
