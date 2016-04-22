import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setActiveNavTab } from 'redux/modules/activeNavTab'
import { signUpUser } from 'redux/modules/dashboard'

import SignUpForm from 'forms/SignUpForm'
import Footer from 'components/Footer/Footer'

export class Login extends React.Component {
  props: Props;

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
  activeNavTab: state.activeNavTab
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ setActiveNavTab, signUpUser }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Login)

