import React, { Component } from 'react'
import { connect } from 'react-redux'


import Footer from 'components/Footer'

class NewsContainer extends Component {
  render() {
    const { children } = this.props;

    let content = (
      <div>
        最新新闻
        <Footer activeNavTab='LATEST' />
      </div>
    )

    if (children) {
      content = children
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  referee: state.referee
})

export default connect(
  mapStateToProps,
  {
   
  },
)(NewsContainer)
