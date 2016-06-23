import React from 'react'
import { connect } from 'react-redux'

import Referee from '../components/Referee'

const mapStateToProps = (state) => ({
  referee: state.referee
})


export default connect(
  mapStateToProps,
  {

  }
)(Referee)
