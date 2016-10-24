import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from 'components/Footer'
import NewsTopNav from './NewsTopNav'

import cs from './NewsList.scss'
import NewsContainer from '../containers/NewsContainer'

export default class NewsList extends Component {
  componentDidMount() {
    const { fetchNewsList, children, newsList } = this.props

    if (!children || newsList.length === 0) {
      fetchNewsList()
    }
  }

  renderList() {
    const { newsList } = this.props

    const rows = newsList.map((item, index) => (
      <NewsContainer key={item.id} item={item} />
    ))

    return (
      <div>
        {rows}
      </div>
    )
  }

  render() {
    const { children, newsList } = this.props;

    let content = (
      <div className={cs.container}>
        <NewsTopNav {...this.props} />
        {this.renderList()}
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
