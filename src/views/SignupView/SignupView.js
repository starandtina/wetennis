import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signUpUser } from 'redux/modules/users'

import SignUpForm from 'forms/SignUpForm'
import Footer from 'components/Footer/Footer'

export class Login extends React.Component {
  props: Props;

  componentWillMount () {
    // this.props.actions.setActiveNavTab('DASHBOARD')
  }

  render () {
    return (
      <div>
        <SignUpForm onSubmit={this.handleSubmit.bind(this)} />
      </div>
    )
  }

  handleSubmit (data) {
    this.props.actions.signUpUser(data);
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ signUpUser }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Login)

