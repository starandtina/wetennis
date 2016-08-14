import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

import Footer from 'components/Footer'
import NewsTopNav from './NewsTopNav'

import cs from './NewsList.scss'
import News from './News'

export default class NewsList extends Component {
  componentDidMount() {
    const { fetchNewsList, children } = this.props

    if (!children) {
      fetchNewsList()
    }
  }

  renderList() {
    const { newsList } = this.props

    let rows = []

    {newsList.forEach((item, index) => {
      rows.push(<Link to={`/news/${item.id}`} key={item.id}><News item={item} /></Link>)
    })}

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
