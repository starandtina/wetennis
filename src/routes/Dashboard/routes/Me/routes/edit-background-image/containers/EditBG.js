import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { reduxForm, getFormValues, Field, initialize } from 'redux-form'
import NavBack from 'components/NavBack'
import UploadImage from 'components/UploadImage'
import { TextField } from 'redux-form-material-ui'

import cs from './EditBG.scss'
import { uploadImage } from 'store/modules/image'
import { updateBGImage, setUserBackgroundImageUrl } from 'routes/Dashboard/modules/user'

class EditBG extends PureComponent {
  constructor(props) {
    super(props)

    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  uploadImage = uploadFile => {
    const { uploadImage, setUserBackgroundImageUrl } = this.props
    
    uploadImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name
    }).then(data => {
      setUserBackgroundImageUrl(data.payload.data.imageUrl)
    })
  }

  updateBGImage = () => {
    const {
      updateBGImage,
      backGroundImageUrl,
      id,
      push,
    } = this.props

    updateBGImage({
      ImageUrl: backGroundImageUrl,
      userId: id
    }).then(({
      payload: {
        code
      }
    }) => {
      if (code === 0) {
        push('/dashboard/me')
      }
    })
  }

  render () {
    const { backGroundImageUrl } = this.props

    return <div className='container u-has-nav'>
      <NavBack routes={this.props.routes} caption='更新背景图片' leftText='close' transparent removeColor className='white-theme'>
        <label htmlFor='uploadImage' className={cs.AddImage}>
          <UploadImage
            type='file'
            id='uploadImage'
            onDone={this.uploadImage}
          />
          <i className='material-icons u-marginRight10'>collections</i>
        </label>
        <i onClick={this.updateBGImage} className='material-icons u-marginRight10'>done</i>
      </NavBack>
      <div className={`${cs.imgContainer} u-aligner`}>
        <img className='img-responsive' src={backGroundImageUrl} alt=''/>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  id: state.user.user && state.user.user.id,
  backGroundImageUrl: state.user && state.user.userInfo && state.user.userInfo.backGroundImageUrl,
})

export default connect(
  mapStateToProps, {
    updateBGImage,
    uploadImage,
    push,
    goBack,
    setUserBackgroundImageUrl,
  }
)(EditBG)
