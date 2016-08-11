import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from '../components/eventMatch'

import {
  getDetails, getComments, sendComment, likeComment, getTechnicalStatistics,
} from '../modules/eventMatch'

const mapStateToProps = (state) => {
  const {
    details, comments, technicalStatistics
  } = state.eventMatch
  return {
    details, comments, technicalStatistics
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails, getComments, sendComment, likeComment, getTechnicalStatistics,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
