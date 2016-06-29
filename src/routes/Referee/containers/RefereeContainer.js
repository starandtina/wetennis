import React from 'react'
import { connect } from 'react-redux'

import Referee from '../components/Referee'
import { fetchReferee, forehandReferee, operateReferee } from '../modules/referee'

const mapStateToProps = (state) => ({
  referee: state.referee
})

export default connect(
  mapStateToProps,
  {
    fetchReferee,
    forehandReferee,
    operateReferee
  },
)(Referee)
