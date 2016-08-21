import React, { Component } from 'react';
import UploadImage from './uploadImage';

import style from './addImage.scss';

class AddImage extends Component {
  uploadImage = uploadFile => {
    const { addImage } = this.props;
    addImage({
      imgstr: uploadFile.base64,
      name: uploadFile.name
    });
  };

  render() {
    const { uploadedImages } = this.props;
    //console.log(uploadedImages);
    return (
      <div className={style.Root}>
        {uploadedImages.map((img, index) => (
          <div key={index} className={style.Image}><img src={img} alt=""/></div>
        ))}
        <label htmlFor="uploadImage" className={style.AddImage}>
          <UploadImage
            type="file"
            id="uploadImage"
            onDone={this.uploadImage}
          />
          <i className="material-icons">add</i>
        </label>

      </div>
    )
  }
}

export default AddImage;