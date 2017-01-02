import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { reduxForm, Field, submit } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import NavBack from 'components/NavBack'
import UploadImage from 'components/UploadImage'

import classes from './EditEquipment.scss'

import { updateEquipment, deleteEquipment, uploadEquipmentImage, clearUploadEquipmentImageUrl } from 'routes/Dashboard/modules/user'

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

  if(!values.price) {
    errors.price = '请输入价格'
    hasErrors = true
  }

  if(!values.size) {
    errors.size = '请输入尺码'
    hasErrors = true
  }

  return hasErrors && errors
}

class EditEquipment extends PureComponent {
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

  handleDoneClick = () => {
    const { submit } = this.props

    submit('updateEquipmentForm')
  }

  uploadImage = uploadFile => {
    const {
      uploadEquipmentImage
    } = this.props
    
    uploadEquipmentImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name,
    })
  }

  deleteEquipment = () => {
    const {
      deleteEquipment,
      params: {
        id
      },
      push,
    } = this.props

    deleteEquipment({
      id,
    }).then(action => {
      if (!action.error) {
        push('/dashboard')
      }
    })
  }

  render () {
    const {
      handleSubmit,
      uploadEquipmentImageUrl,
      } = this.props
    const style = {
      width: '25%',
      marginLeft: '20px',
      verticalAlign: 'bottom'
    }

    return <div className='u-has-nav'>
      <NavBack routes={this.props.routes} caption='编辑装备' leftText='close' transparent className='white-theme'>
        <label htmlFor='uploadImage' className={classes.AddImage}>
          <UploadImage
            type='file'
            id='uploadImage'
            onDone={this.uploadImage}
          />
          <i className='material-icons u-marginRight10'>collections</i>
        </label>
        <i onClick={this.deleteEquipment} className='material-icons u-marginRight10'>delete</i>
        <i onClick={this.handleDoneClick} className='material-icons u-marginRight10'>done</i>
      </NavBack>
      <div className={`${classes.imgContainer} u-aligner`}>
        {uploadEquipmentImageUrl && <img className='img-responsive' src={uploadEquipmentImageUrl} alt=''/>}
      </div>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div className={`container ${classes['form']}`}>
          <Field
            component={TextField}
            style={style}
            hintText='品牌'
            floatingLabelText='品牌'
            name='logo'
          />
          <Field
            component={TextField}
            type='number'
            style={style}
            hintText='价格'
            floatingLabelText='价格'
            name='price'
            step={0.1}
          />
          <Field
            component={TextField}
            type='number'
            style={style}
            hintText='尺码'
            floatingLabelText='尺码'
            name='size'
            step={0.1}
          />
        </div>
      </form>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  const equipment = state.user && state.user.userInfo && state.user.userInfo.equipment
  const initialValues = equipment ? equipment.find(item => item.id == props.params.id) : {}

  return {
    initialValues,
    uploadEquipmentImageUrl: state.user.uploadEquipmentImageUrl || initialValues.imgUrl,
  }
}

const onSubmit = (values, dispatch, props) => {
  const {
    updateEquipment,
    goBack,
    uploadEquipmentImageUrl,
    params: {
      id
    },
  } = props

  updateEquipment({
    ...values,
    imgUrl: uploadEquipmentImageUrl,
    id,
  }).then(({
    payload: {
      code
    }
  }) => {

    if (code === 0) {
      goBack()
    }
  })
}

export default connect(
  mapStateToProps,
  {
    updateEquipment,
    deleteEquipment,
    uploadEquipmentImage,
    clearUploadEquipmentImageUrl,
    push,
    goBack,
    submit,
  }
)(
  reduxForm({
    form: 'updateEquipmentForm',
    validate,
    onSubmit: onSubmit,
  })(EditEquipment)
)
