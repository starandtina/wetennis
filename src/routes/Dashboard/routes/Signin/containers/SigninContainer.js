import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { resetSigninUser } from 'routes/Dashboard/modules/user'

import Signin from '../components/Signin'

const mapStateToProps = (state) => ({

})

export default connect(
  mapStateToProps, 
  {
    resetSigninUser
  }
)(Signin)
