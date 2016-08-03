import React, { Component } from 'react'

import News from './News'

export default class NewsList extends Component {
  render() {
    const { news } = this.props

    let rows = []

    {news.list.forEach((item, index) => {
      rows.push(<News item={item} key={item.id} />)
    })}

    return (
      <div>
        {rows}
      </div>
    )
  }
}
