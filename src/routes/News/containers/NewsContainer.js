import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'components/Footer'

import NewsTopNav from '../components/NewsTopNav'
import NewsList from '../components/NewsList'
import { fetchNews } from '../modules'

import cs from './NewsContainer.scss'

class NewsContainer extends Component {
  componentDidMount() {
    const { fetchNews } = this.props

    fetchNews()
  }

  render() {
    const { children, news } = this.props;

    let content = (
      <div className={cs.container}>
        <NewsTopNav />
        <NewsList news={news} />
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
  news: state.news
})

export default connect(
  mapStateToProps,
  {
    fetchNews
  },
)(NewsContainer)
