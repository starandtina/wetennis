import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { reduxForm, submit } from 'redux-form'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import NavBack from 'components/NavBack'
import UploadImage from 'components/UploadImage'

import classes from './AddEquipment.scss'

import { addEquipment, uploadEquipmentImage, clearUploadEquipmentImageUrl } from 'routes/Dashboard/modules/user'

const validate = (values) => {
  var errors = {}
  var hasErrors = false
  if(!values.imgUrl || values.imgUrl.trim() === '') {
    errors.imgUrl = '请上传图片'
    hasErrors = true
  }
  if(!values.logo || values.logo.trim() === '') {
    errors.logo = '请输入品牌名'
    hasErrors = true
  }

  if(!values.price || values.price.trim() === '') {
    errors.price = '请输入价格'
    hasErrors = true
  }

  if(!values.size || values.size.trim() === '') {
    errors.size = '请输入尺码'
    hasErrors = true
  }

  return hasErrors && errors
}

class AddressEdit extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillMount() {
    const { clearUploadEquipmentImageUrl } = this.props

    clearUploadEquipmentImageUrl()
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  uploadImage = uploadFile => {
    const { uploadEquipmentImage } = this.props
    uploadEquipmentImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name
    })
  }

  handleDoneClick = () => {
    const { submit } = this.props

    submit('addEquipmentForm')
  }

  render () {
    const {
      handleSubmit,
      uploadEquipmentImageUrl,
    } = this.props

    const style = {
      width: '25%',
      marginRight: '20px',
      verticalAlign: 'bottom',
    }

    return <div className='u-has-nav'>
      <NavBack routes={this.props.routes} caption="新增装备" leftText="close" transparent className='white-theme'>
        <label htmlFor="uploadImage" className={classes.AddImage}>
          <UploadImage
            type="file"
            id="uploadImage"
            onDone={this.uploadImage}
          />
          <i className="material-icons u-marginRight10">collections</i>
        </label>
        <i onClick={this.handleDoneClick} className="material-icons u-marginRight10">done</i>
      </NavBack>
      <div className={`${classes.imgContainer} u-aligner`}>
        {uploadEquipmentImageUrl && <img className='img-responsive' src={uploadEquipmentImageUrl} alt=""/>}
      </div>
      <form className={`${classes.container}`} onSubmit={handleSubmit}>
        <div className={`container ${classes['form']}`}>
          <Field
            name="logo"
            component={TextField}
            hintText="品牌"
            floatingLabelText="品牌"
            style={{
              width: '30%',
              marginRight: '20px',
              verticalAlign: 'bottom',
            }}
          />
          <Field
            name="price"
            component={TextField}
            type="number"
            hintText="价格"
            floatingLabelText="价格"
            style={style}
            step={0.1}
          />
          <Field
            name="size"
            component={TextField}
            type="number"
            hintText="尺码"
            floatingLabelText="尺码"
            style={style}
            step={0.1}
          />
        </div>
      </form>
    </div>
  }
}

const onSubmit = (values, dispatch, props) => {
  const {
    addEquipment,
    goBack,
    uploadEquipmentImageUrl,
  } = props

  addEquipment({
    imgUrl: uploadEquipmentImageUrl,
    logo: values.logo,
    price: +values.price,
    size: +values.size,
  }).then(action => {
    if (!action.error) {
      goBack()
    }
  })
}


const mapStateToProps = state => ({
  uploadEquipmentImageUrl: state.user.uploadEquipmentImageUrl,
})

export default connect(mapStateToProps, {
  addEquipment,
  uploadEquipmentImage,
  clearUploadEquipmentImageUrl,
  push,
  goBack,
  submit,
})(reduxForm({
  form: 'addEquipmentForm',
  validate,
  onSubmit: onSubmit,
})(AddressEdit))
