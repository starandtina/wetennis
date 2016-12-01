import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm, getFormValues, Field, initialize } from 'redux-form'
import {
  TextField
} from 'redux-form-material-ui'
import NavBack from 'components/NavBack';
import UploadImage from 'components/UploadImage/uploadImage';

import classes from './EditEquipment.scss'

import { updateEquipment, deleteEquipment, uploadEquipmentImage } from 'routes/Dashboard/modules/user'

const mapStateToProps = (state, props) => {
  const equipment = state.user && state.user.userInfo && state.user.userInfo.equipment;
  const initialValues = equipment ? equipment.find(item => item.id == props.params.id) : {};
  return ({
  settings: state.settings,
  initialValues,
  formValues: getFormValues('updateEquipmentForm')(state),
})};

const mapDispatchToProps = {
  updateEquipment,
  deleteEquipment,
  uploadEquipmentImage,
  push,
  goBack
};

const validate = (values) => {
  var errors = {};
  var hasErrors = false;
  if(!values.imgUrl || values.imgUrl.trim() === '') {
    errors.imgUrl = '请上传图片';
    hasErrors = true;
  }
  if(!values.logo || values.logo.trim() === '') {
    errors.logo = '请输入品牌名';
    hasErrors = true;
  }

  if(!values.price) {
    errors.price = '请输入价格';
    hasErrors = true;
  }

  if(!values.size) {
    errors.size = '请输入尺码';
    hasErrors = true;
  }
  return hasErrors && errors;
}

class AddressEdit extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  state = {
    imgUrl: this.props.initialValues.imgUrl
  };

  uploadImage = uploadFile => {
    const { uploadEquipmentImage } = this.props;
    uploadEquipmentImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name
    }).then(action => {
      this.setState({
        imgUrl: action.payload.data.imageUrl
      });
    });
  };

  updateEquipment = () => {
    const {
      updateEquipment,
      formValues,
      goBack,
      params: { id },
      } = this.props;
    updateEquipment({
      ...formValues,
      id
    }).then(action => {
      if (!action.error) {
        goBack();
      }
    })
  };

  deleteEquipment = () => {
    const {
      deleteEquipment,
      params: { id },
      push,
      } = this.props;
    deleteEquipment({ id }).then(action => {
      if (!action.error) {
        push('/dashboard');
      }
    })
  };

  render () {
    const {
      handleSubmit,
      submitting,
      } = this.props;
    const style = {
      width: '25%',
      marginLeft: '20px',
      verticalAlign: 'bottom'
    };
    return (
      <form className={classes.Root} onSubmit={handleSubmit(this.updateEquipment)}>
        <NavBack routes={this.props.routes} caption=" " leftText="close" transparent className='white-theme'>
          <button type="button" disabled={submitting}>
            <label htmlFor="uploadImage" className={classes.AddImage}>
              <UploadImage
                type="file"
                id="uploadImage"
                onDone={this.uploadImage}
              />
              <i className="material-icons">collections</i>
            </label>
          </button>
          <button type="button" disabled={submitting} onClick={this.deleteEquipment}>
            <i className="material-icons">delete</i>
          </button>
          <button type="submit" disabled={submitting}>
            <i className="material-icons">done</i>
          </button>
        </NavBack>
        <div className={classes.imgContainer}><img src={this.state.imgUrl} alt=""/></div>
        <div className={classes.Field}>
          <Field
            component={TextField}
            style={style}
            hintText="品牌"
            floatingLabelText="品牌"
            name="logo"
          />
          <Field
            component={TextField}
            type="number"
            style={style}
            hintText="价格"
            floatingLabelText="价格"
            name="price"
            step={0.1}
          />
          <Field
            component={TextField}
            type="number"
            style={style}
            hintText="尺码"
            floatingLabelText="尺码"
            name="size"
            step={0.1}
          />
        </div>
      </form>

    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'updateEquipmentForm',
    validate
  })(AddressEdit)
)
