import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm, getFormValues, Field, initialize } from 'redux-form'
import NavBack from 'components/NavBack';
import UploadImage from 'components/UploadImage/uploadImage';
import {
  TextField
} from 'redux-form-material-ui'

import cs from './EditBG.scss'

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

  state = {
    backGroundImageUrl: this.props.initialValues.backGroundImageUrl
  };

  uploadImage = uploadFile => {
    const { uploadEquipmentImage } = this.props;
    uploadEquipmentImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name
    }).then(action => {
      this.setState({
        backGroundImageUrl: action.payload.data.imageUrl
      });
    });
  };

  updateBGImage = () => {
    const {
      updateBGImage,
      id,
      push,
      } = this.props;

    updateBGImage({
      ImageUrl: this.state.backGroundImageUrl,
      userId: id
    }).then(action => {
      if (!action.error) {
        push('/dashboard/me');
      }
    })
  };

  render () {
    const {
      handleSubmit,
      submitting,
      } = this.props;

    console.log(this.state.backGroundImageUrl);

    return (
      <div className='u-hasNav'>
        <form className={cs.Root} onSubmit={handleSubmit(this.updateBGImage)}>
          <NavBack routes={this.props.routes} caption=" " leftText="close" transparent removeColor className='white-theme'>
            <button type="button" disabled={submitting}>
              <label htmlFor="uploadImage" className={cs.AddImage}>
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
          <div className={`${cs.imgContainer} u-aligner`}>
            <img className='img-responsive' src={this.state.backGroundImageUrl} alt=""/>
          </div>
        </form>
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'updateBGForm'
})(AddressEdit));
