import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from '../components/eventMatch'

import {
  getDetails, getComments, sendComment, likeComment
} from '../modules/eventMatch'

const mapStateToProps = (state) => {
  const {
    details, comments
  } = state.eventMatch
  return {
    details, comments
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails, getComments, sendComment, likeComment
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
