import React, { Component } from 'react'
import TopNav from 'components/TopNav'

export default class NewsList extends Component {
  render() {
    return (
      <div>
        <TopNav title='最新新闻'>
          <div ref='left'></div>
          <div ref='right'></div>
        </TopNav>
      </div>
    )
  }
}

