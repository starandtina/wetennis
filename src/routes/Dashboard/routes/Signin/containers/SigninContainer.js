import { connect } from 'react-redux'

import { resetSigninUser } from 'routes/Dashboard/modules/user'
import Signin from '../components/Signin'

export default connect(
  null, 
  {
    resetSigninUser
  }
)(Signin)
