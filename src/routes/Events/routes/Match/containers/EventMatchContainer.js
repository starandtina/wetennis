import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from '../components/eventMatch'

import {
  getDetails, getComments, sendComment, likeComment,
  getTechnicalStatistics, getGuess,
} from '../modules/eventMatch'

const mapStateToProps = (state) => {
  const {
    details, comments, technicalStatistics, guess
  } = state.eventMatch
  return {
    details, comments, technicalStatistics, guess
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails, getComments, sendComment, likeComment,
  getTechnicalStatistics, getGuess,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
