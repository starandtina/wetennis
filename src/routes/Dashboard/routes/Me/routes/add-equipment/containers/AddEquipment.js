import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm, getFormValues } from 'redux-form';
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import NavBack from 'components/NavBack';
import UploadImage from 'components/UploadImage/uploadImage';

import classes from './AddEquipment.scss'

import { addEquipment, uploadEquipmentImage } from 'routes/Dashboard/modules/user'

const mapStateToProps = (state) => ({
  settings: state.settings,
  formValues: getFormValues('addEquipmentForm')(state)
});

const mapDispatchToProps = {
  addEquipment,
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

  if(!values.price || values.price.trim() === '') {
    errors.price = '请输入价格';
    hasErrors = true;
  }

  if(!values.size || values.size.trim() === '') {
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
    imgUrl: null
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

  addEquipment = () => {
    const {
      addEquipment,
      formValues,
      goBack,
      } = this.props;
    addEquipment({
      imgUrl: this.state.imgUrl,
      logo: formValues.logo,
      price: +formValues.price,
      size: +formValues.size,
    }).then(action => {
      if (!action.error) {
        goBack();
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
      <form className={`${classes.Root} u-has-nav`} onSubmit={handleSubmit(this.addEquipment)}>
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
          <button type="submit" disabled={submitting}>
            <i className="material-icons">done</i>
          </button>
        </NavBack>
        <div className={`${classes.imgContainer} u-aligner`}>
          {this.state.imgUrl && <img src={this.state.imgUrl} alt=""/>}
        </div>
        <div className={classes.Field}>
          <Field
            name="logo"
            component={TextField}
            hintText="品牌"
            floatingLabelText="品牌"
            style={style}
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

    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(
  {
    form: 'addEquipmentForm',
    validate
  }
)(AddressEdit));
