import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from '../components/eventMatch'

import {
  getDetails
} from '../modules/eventMatch'

const mapStateToProps = (state) => {
  const { details } = state.eventMatch
  return { details }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
