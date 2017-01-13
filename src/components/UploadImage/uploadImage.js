import React, { PureComponent } from 'react'

export default class UploadImage extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
    }
  }

  handleChange = e => {
    let files = e.target.files

    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => {
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        }

        this.props.onDone(fileInfo)
      }
    }
  }

  render() {
    const { onDone, ...rest } = this.props

    return (
      <input
        type="file"
        onChange={this.handleChange}
        accept="image/*"
        {...rest}
      />
    )
  }
}
