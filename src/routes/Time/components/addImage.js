import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import UploadImage from 'components/UploadImage'
import { uploadImage } from 'store/modules/image'

import style from './addImage.scss'

class AddImage extends PureComponent {
  handleUploadImage = uploadFile => {
    const { addImage, uploadImage } = this.props

    uploadImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name,
    }).then(({payload: { code, data }}) => {
      addImage({
        imgUrl: data.imageUrl,
        name: uploadFile.name,
      })
    })
  }

  render() {
    const { uploadedImages = [] } = this.props

    return (
      <div className={style.container}>
        {uploadedImages.map((img, index) => (
          <div key={index} className={style.Image}><img src={img} alt='' /></div>
        ))}
        <label htmlFor='uploadImage' className={style.AddImage}>
          <UploadImage
            type='file'
            id='uploadImage'
            onDone={this.handleUploadImage}
          />
          <i className='material-icons'>add</i>
        </label>
      </div>
    )
  }
}

export default connect(null, {
  uploadImage,
})(AddImage)
