import React, { Component } from 'react'

export default class Program extends Component {
  componentDidMount() {
    const { fetchProgram, params: { eventId, date } } = this.props

    fetchProgram({ eventId, date })
  }

  render() {
    const { scheduledCourts, unScheduledMatches } = this.props

    const unScheduledMatchCards = unScheduledMatches.map((item, index) => (
        <label key={item.name}>{item.name}</label>
    ))

    return <div>
      {unScheduledMatchCards}
      <h1>hello world</h1>
    </div>
  }
}
