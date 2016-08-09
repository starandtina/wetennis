import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'components/Footer'

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

        <h1>hello</h1>
        <NewsComments
          groupId={newsId}
          data={comments}
        />
      </div>
    )
  }
}
