import { connect } from 'react-redux'

import Program from '../components/Program'
import { fetchProgram } from '../modules/program'

const mapStateToProps = (state) => ({
  program: state.program.program
})

export default connect(
  mapStateToProps,
  {
    fetchProgram
  },
)(Program)
