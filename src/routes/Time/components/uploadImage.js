import React from 'react';
import ReactDOM from 'react-dom';

class FileBase64 extends React.Component {

  constructor() {
    super()
    this.state = {
      files: []
    }
    this.props = {
      multiple: false
    }
  }

  handleChange(e){

    let files = e.target.files;

    for (var i = 0; i < files.length; i++) {

      let file = files[i]

      let reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {

        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000)+' kB',
          base64: reader.result,
          file: file
        }
          this.props.onDone(fileInfo)
      }

    }

  }

  render(){
    return (
      <input
        type="file"
        onChange={ this.handleChange.bind(this) }
        {...this.props}
      />
    )
  }

}

export default FileBase64;