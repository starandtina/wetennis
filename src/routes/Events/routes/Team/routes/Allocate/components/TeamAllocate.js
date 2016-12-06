import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import dragula from 'react-dragula'

import NavBack from 'components/NavBack'

import TeamSequence from './TeamSequence'
import TeamMemberView from './TeamMemberView'
import cs from './TeamAllocate.scss'

export default class TeamAllocate extends PureComponent {
  componentDidMount() {
    const { fetchRegisteredTeamSequence, fetchRegisteredTeamMembers, moveTeamMember, params: { teamId } } = this.props

    fetchRegisteredTeamSequence({teamId})
    fetchRegisteredTeamMembers({teamId})

    dragula([...document.querySelectorAll('.dragula-container')], {
      copy: true,
      // As some of the containers are rendered after `TeamAllocatecomponentDidMount`
      isContainer: function (el) {
        return el.classList.contains('dragula-container');
      }
    }).on('drop', (el, target, source, sibling) => {
      const teamMemberId = el.dataset.teamMemberId
      const targetTeamSequenceId = target && target.dataset.teamSequenceId
      const sourceTeamSequenceId = source.dataset.teamSequenceId

      moveTeamMember({
        teamMemberId,
        targetTeamSequenceId,
        sourceTeamSequenceId,
      })

      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    })
  }

  allocateTeamMembers = () => {

  }

  render() {
    const { registeredTeamSequence, registeredTeamMembers, unScheduledTeamMemberIds, push } = this.props

    return <div className='u-has-nav container'>
      <NavBack routes={this.props.routes} caption='出战顺序' handleGoBack={() => push(`/events/${eventId}`)}>
        <div onClick={this.allocateTeamMembers}>
          <i className={`material-icons`}>done</i>
        </div>
      </NavBack>
      <Grid>
        <Row>
          <Col xs={6}>
            {registeredTeamSequence.map( s => (
              <TeamSequence key={s.id} registeredTeamMembers={registeredTeamMembers} {...s} />
            ))}
          </Col>
          <Col xs={6}>
            <p>队员</p>
            <div className={`dragula-container dragula-team-allocate-members-container`}>
              {unScheduledTeamMemberIds.map( teamMemberId => (
                <TeamMemberView key={teamMemberId} {...registeredTeamMembers[teamMemberId]} />
              ))}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  }
}
