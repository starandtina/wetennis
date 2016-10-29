import React, { Component } from 'react'
import dragula from 'react-dragula'

import Court from './Court'
import Match from './Match'
import cs from './Program.scss'

export default class Program extends Component {
  componentDidMount() {
    const {
      fetchProgram,
      adjustMatch,
      params: {
        eventId,
        date
      }
    } = this.props

    fetchProgram({
      eventId,
      date
    })

    dragula([...document.querySelectorAll('.dragula-container')], {
      copy: true,
      isContainer: function (el) {
        return el.classList.contains('dragula-container');
      }
    }).on('drop', function (el, target, source, sibling) {
      // If we only adjust order in current court, then targe'd be `null`

      const targetCourtId = target ? target.dataset.courtId : source.dataset.courtId

      adjustMatch({
        el: { ...el.dataset },
        targetCourtId: targetCourtId,
        sibling: { matchId: sibling && sibling.dataset.matchId },
        isFromTemporary: source.classList.contains('temporary')
      })

      el.parentNode.removeChild(el)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (Object.keys(this.props.program.players).length === Object.keys(nextProps.program.players).length) {
    //   return false
    // }

    return true
  }

  handleClick = () => {
    const { updateProgram, program } = this.props

    updateProgram({
      courts: program.courts
    })
  }

  render() {
    const {
      unScheduledMatchIds,
      program
    } = this.props
    const {
      players,
      matches,
      courts
    } = program

    return <div className={`${cs.container} container`}>
      <p><button onClick={this.handleClick}>Update Program</button></p>
      <div className='dragula-container temporary'>
        {unScheduledMatchIds.map(key => (
          <Match key={key} match={matches[key]} matchId={key} {...program} />
        ))}
      </div>
      <div className={cs['court-container']}>
        {Object.keys(courts).map(key => (
          <Court key={key} court={courts[key]} courtId={key} {...program} />
        ))}
      </div>
    </div>
  }
}
