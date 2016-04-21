import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setActiveNavTab } from 'redux/modules/activeNavTab'
import LoginForm from 'forms/LoginForm'
import Footer from 'components/Footer/Footer'

export class Login extends React.Component {
  props: Props;

  render () {
    return (
      <div className='container'>
        <LoginForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activeNavTab: state.activeNavTab
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ setActiveNavTab }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Login)

