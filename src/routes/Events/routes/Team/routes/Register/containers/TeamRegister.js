import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import TeamRegister from '../components/TeamRegister'
import { startAddTeamMember, addTeamMember } from '../modules/register'

const mapStateToProps = (state) => ({
  register: state.register.register,
  members: state.register.register.members,
  adding: state.register.register.adding
})

export default connect(
  mapStateToProps,
  {
    startAddTeamMember,
    addTeamMember
  }
)(TeamRegister)

