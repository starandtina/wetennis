import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import dragula from 'react-dragula'

import NavBack from 'components/NavBack'

import TeamSequence from './TeamSequence'
import TeamMemberView from './TeamMemberView'
import cs from './TeamAllocate.scss'

export default class TeamAllocate extends PureComponent {
  componentDidMount() {
    const { fetchRegisteredTeamSequence, fetchRegisteredTeamMembers, moveTeamMember, 
      params: { eventId, teamId }, 
      location: { query },
    } = this.props
    const { matchId } = query

    fetchRegisteredTeamSequence({
      eventId,
      teamId,
      matchId
    }).then(() => {
      this.forceUpdate()
    })
    fetchRegisteredTeamMembers({
      eventId,
      teamId,
      matchId
    }).then(() => {
      this.forceUpdate()
    })

    dragula([...document.getElementsByClassName('dragula-container')], {
      // As some of the containers are rendered after `TeamAllocatecomponentDidMount`
      isContainer: function (el) {
        return el.classList.contains('dragula-container')
      },
    }).on('drop', (el, target, source, sibling) => {
      // If target is null and it means the `source` and `target` is the same
      // So we do nothing

      if (!target) {
        return true
      }

      const teamMemberId = el.dataset.teamMemberId
      const sourceTeamSequenceId = source.dataset.teamSequenceId
      const targetTeamSequenceId = target.dataset.teamSequenceId
      
      moveTeamMember({
        teamMemberId,
        targetTeamSequenceId,
        sourceTeamSequenceId,
      })
    })
  }

  shouldComponentUpdate() {
    return false
  }

  updateRegisteredTeamSequence = () => {
    const {
      updateRegisteredTeamSequence,
      registeredTeamSequence,
      push,
      params: { eventId },
      location: { query },
    } = this.props

    updateRegisteredTeamSequence({
      schedule: registeredTeamSequence,
      matchId: query.matchId,
    }).then(({payload: { code, data }}) => {
      if (Number(code) === 0) {
        push(`/events/${eventId}`)
      }
    })
  }

  render() {
    const { registeredTeamSequence, registeredTeamMembers, unScheduledTeamMemberIds, push } = this.props

    return (
      <div className='u-has-nav container'>
        <NavBack routes={this.props.routes} caption='出战顺序' handleGoBack={() => push(`/events/${eventId}`)}>
          <div onClick={this.updateRegisteredTeamSequence}>
            <i className={`material-icons`}>done</i>
          </div>
        </NavBack>
        <Grid>
          <Row>
            <Col xs={6}>
              {registeredTeamSequence.map(s =>
                <TeamSequence key={s.id} registeredTeamMembers={registeredTeamMembers} {...s} />
              )}
            </Col>
            <Col xs={6}>
              <p>队员</p>
              <div className={`dragula-container dragula-team-allocate-members-container`}>
                {unScheduledTeamMemberIds.map(teamMemberId =>
                  registeredTeamMembers[teamMemberId] &&
                    <TeamMemberView key={teamMemberId} {...registeredTeamMembers[teamMemberId]} />
                )}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
