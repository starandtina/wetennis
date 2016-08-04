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
    const { children, newsList } = this.props;

    let content = (
      <div className={cs.container}>
        <NewsTopNav {...this.props} />
        <NewsList newsList={newsList} />
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

const getProviderFilterList = (newsList = []) => ([ '全部', ...new Set(newsList.map(n => n.provider)) ])

const getVisibleNewsList = (newsList, providerFilter) => {
  if (providerFilter === '全部') {
    return newsList
  } else {
    return newsList.filter(n => n.provider === providerFilter)
  }
}

const mapStateToProps = (state) => ({
  providerList: getProviderFilterList(state.news.list),
  newsList: getVisibleNewsList(state.news.list, state.news.providerFilter),
  providerFilter: state.news.providerFilter
})

export default connect(
  mapStateToProps,
  {
    fetchNews
  },
)(NewsContainer)
