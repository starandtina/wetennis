import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import dragula from 'react-dragula'

import NavBack from 'components/NavBack'

import TeamSequence from './TeamSequence'
import TeamMemberView from './TeamMemberView'
import cs from './TeamAllocate.scss'

export default class TeamAllocate extends PureComponent {
  componentDidMount() {
    const { fetchRegisteredTeamSequence, fetchRegisteredTeamMembers, params: { teamId } } = this.props

    fetchRegisteredTeamSequence({teamId})
    fetchRegisteredTeamMembers({userId: ''})

     dragula([...document.querySelectorAll('.dragula-container')], {
    }).on('drop', (el, target, source, sibling) => {
      const addIcon = target.getElementsByClassName('material-icons')[0]

      if (target && 
          target.children.length > 1 && 
          !target.classList.contains('dragula-team-allocate-members-container')) {
        addIcon && addIcon.classList.add('hide')
      } else {
        addIcon && addIcon.classList.remove('hide')
      }
    }) 
  }

  allocateTeamMembers = () => {

  }

  render() {
    const { registeredTeamSequence, registeredTeamMembers, push } = this.props

    return <div className='u-has-nav container'>
      <NavBack routes={this.props.routes} caption='出战顺序' handleGoBack={() => push(`/events/${eventId}`)}>
        <div onClick={this.allocateTeamMembers}>
          <i className={`material-icons`}>done</i>
        </div>
      </NavBack>
      <Grid>
        <Row>
          <Col xs={6}>
            {registeredTeamSequence.map( s => {
              return <TeamSequence key={s.id} {...s} />
            })}
          </Col>
          <Col xs={6}>
            <p>队员</p>
            <div className={`dragula-container dragula-team-allocate-members-container`}>
              {registeredTeamMembers.map( m => {
                return <TeamMemberView key={m.id} {...m} />
              })}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  }
}
