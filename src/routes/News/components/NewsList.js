import React, { Component } from 'react'

export default class NewsList extends Component {
  render() {
    const { news } = this.props

    let rows = []

    {news.list.forEach((item, index) => {
      rows.push(item.title)
    })}

    return (
      <div>
        {rows}
      </div>
    )
  }

  renderEvent(item) {
    return (
      <div>
        {item.name}
      </div>
    )
  }
}
