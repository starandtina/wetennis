import { connect } from 'react-redux'

import Program from '../components/Program'
import { fetchProgram, updateProgram, adjustMatch } from '../modules/program'
import { getUnScheduledMatchIds } from '../modules'

const mapStateToProps = (state) => ({
  unScheduledMatchIds: getUnScheduledMatchIds(state.program),
  program: state.program.program
})

export default connect(
  mapStateToProps,
  {
    fetchProgram,
    updateProgram,
    adjustMatch
  },
)(Program)
