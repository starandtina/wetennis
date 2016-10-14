import React from 'react'
import { connect } from 'react-redux'

import { resetSignupUser } from 'routes/Dashboard/modules/user'

import Signup from '../components/Signup'

const mapStateToProps = (state) => ({

})

export default connect(
  mapStateToProps,
  {
    resetSignupUser
  }
)(Signup)
