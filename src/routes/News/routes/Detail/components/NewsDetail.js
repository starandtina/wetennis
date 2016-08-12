import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'components/Footer'

import NewsDetailTopNav from './NewsDetailTopNav'
import News from 'routes/News/components/News'
import NewsComments from './NewsComments'

import cs from './NewsDetail.scss'

export default class NewsDetail extends Component {
  componentDidMount() {
    const { fetchNews, fetchNewsComments, params: { newsId } } = this.props

    fetchNews({ newsId })
    fetchNewsComments({ newsId })
  }

  render() {
    const { news, comments, params: { newsId } } = this.props

    return (
      <div className={cs.container}>
        <NewsDetailTopNav />
        <News item={news} />
        <NewsComments
          groupId={newsId}
          data={comments}
        />
      </div>
    )
  }
}
