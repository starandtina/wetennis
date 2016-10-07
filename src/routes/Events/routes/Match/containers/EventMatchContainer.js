import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from '../components/eventMatch'

import {
  getDetails, getTechnicalStatistics, getGuess, changeSets
} from '../modules/eventMatch'

const mapStateToProps = (state) => {
  const {
  details, technicalStatistics, guess, sets, currentSets
  } = state.eventMatch
  return {
  details, technicalStatistics, guess, sets, currentSets
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails, getTechnicalStatistics, getGuess, changeSets
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
