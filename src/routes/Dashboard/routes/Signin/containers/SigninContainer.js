import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Signin from '../components/Signin'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
