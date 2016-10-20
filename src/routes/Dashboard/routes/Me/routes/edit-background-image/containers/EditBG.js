import React, { Component } from 'react';
import { push, goBack } from 'react-router-redux'
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import NavBack from 'components/NavBack';
import UploadImage from 'components/UploadImage/uploadImage';

import classes from './EditBG.scss'

import { updateBGImage, uploadEquipmentImage } from 'routes/Dashboard/modules/user'

const mapStateToProps = state => {
  const backGroundImageUrl = state.user && state.user.userInfo && state.user.userInfo.backGroundImageUrl;
  const initialValues = { backGroundImageUrl };
  return ({
    settings: state.settings,
    id:state.user.user && state.user.user.id,
    initialValues
})};

const mapDispatchToProps = {
  updateBGImage,
  uploadEquipmentImage,
  push,
  goBack
};

class AddressEdit extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  uploadImage = uploadFile => {
    const { uploadEquipmentImage, fields: { backGroundImageUrl } } = this.props;
    uploadEquipmentImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name
    }).then(action => {
      console.log(action.payload.data.ImageUrl)
      backGroundImageUrl.onChange(action.payload.data.ImageUrl);
    });
  };

  updateBGImage = () => {
    const {
      updateBGImage,
      values,
      id,
      push,
      } = this.props;
    updateBGImage({
      ...values,
      userId: id
    }).then(action => {
      if (!action.error) {
        push('/dashboard/me');
      }
    })
  };
  //
  //deleteBGImage = () => {
  //  const {
  //    deleteBGImage,
  //    params: { id },
  //    goBack,
  //    } = this.props;
  //  console.log(this.props);
  //  deleteBGImage({ id }).then(action => {
  //    if (!action.error) {
  //      goBack();
  //    }
  //  })
  //};

  render () {
    const {
      fields: { backGroundImageUrl },
      handleSubmit,
      submitting,
      } = this.props;

    return (
      <form className={classes.Root} onSubmit={handleSubmit(this.updateBGImage)}>
        <NavBack caption="" leftText="close" transparent removeColor>
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
        <div className={classes.imgContainer}><img src={backGroundImageUrl.value} alt=""/></div>
      </form>

    )
  }
}
export default reduxForm(
  {
    form: 'updateBGForm',
    fields: ['backGroundImageUrl'],
  },
  mapStateToProps,
  mapDispatchToProps
)(AddressEdit)
