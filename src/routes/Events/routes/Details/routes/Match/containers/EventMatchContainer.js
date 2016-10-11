import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from '../components/eventMatch'

import {
  getDetails, getTechnicalStatistics, getGuess,
} from '../modules/eventMatch'

const mapStateToProps = (state) => {
  const {
  details, technicalStatistics, guess,
  } = state.eventMatch
  return {
  details, technicalStatistics, guess,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails, getTechnicalStatistics, getGuess,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
