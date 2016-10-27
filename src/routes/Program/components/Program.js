import React, { Component } from 'react'

export default class NewsList extends Component {
  componentDidMount() {
    const { fetchProgram, params: { eventId, date } } = this.props

    fetchProgram({ eventId, date })
  }

  render() {
    return <div>
      <h1>hello world</h1>
    </div>
  }
}
