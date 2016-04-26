import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Signup from '../components/Signup'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
