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

    var allFiles = []
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

        allFiles.push(fileInfo)

        if(allFiles.length == files.length){
          this.props.onDone(allFiles)
        }

      }

    }

  }

  render(){
    return (
      <input
        type="file"
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple } />
    )
  }

}

export default FileBase64;