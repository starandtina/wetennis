import { connect } from 'react-redux'

import { resetSignupUser } from 'routes/Dashboard/modules/user'
import Signup from '../components/Signup'


export default connect(
  null,
  {
    resetSignupUser
  }
)(Signup)
