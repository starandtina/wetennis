import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField'

function isPromise(val) {
  return val && typeof val.then === 'function';
}

class FormInput extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string
  };
  static defaultProps = {
    disabled: false,
    autoComplete: 'on',
    type: 'text',
  };

  render() {
    const {
      input,
      type,
      disabled,
      meta: { touched, error },
      hintText,
      floatingLabelText,
      style,
      ...others,
      } = this.props;

    return (
      <TextField
        {...others}
        type={type}
        style={style}
        hintText={hintText}
        errorText={touched ? error : ''}
        floatingLabelText={floatingLabelText}
        disabled={disabled}
        onChange={input.onChange}
        onBlur={input.onBlur}
      />
    );
  }
}

export default FormInput;
