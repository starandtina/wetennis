import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'components/Footer'

import { cls } from 'utils'
import NewsDetailTopNav from './NewsDetailTopNav'
import NewsContainer from 'routes/News/containers/NewsContainer'
import NewsComments from './NewsComments'

import cs from './NewsDetail.scss'

export default class NewsDetail extends Component {
  componentDidMount() {
    const { 
      fetchNews,
      params: { newsId } 
    } = this.props

    fetchNews({ id: newsId })
  }

  render() {
    const { 
      news,
      params: { newsId } 
    } = this.props

    const { content, keywordList } = news

    return (
      <div className={cs.container}>
        <NewsDetailTopNav />
        <NewsContainer item={news} />
        <div className='container'>
          <p>{content}</p>
          <div className={cs.keywordListContainer}>
            <p className='text-muted small'>关键词</p>
            {keywordList ? keywordList.map((item, index) => {
            return (
              <span key={index} className={cls`badge ${cs.badge}`}>{item}</span>
            )
            }) : undefined}
          </div>
        </div>
        <NewsComments groupId={newsId} />
      </div>
    )
  }
}
