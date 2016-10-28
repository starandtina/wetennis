import { connect } from 'react-redux'

import Program from '../components/Program'
import { fetchProgram } from '../modules/program'

const getUnScheduledMatches = ({ courts, matches, players }) => {
  // Collect all of scheduled matches
  const scheduledMatchIds = Object.keys(courts).reduce((memo, courtId) => {
    return [...memo, ...courts[courtId].matches]
  }, [])

  const unScheduledMatchIds = Object.keys(matches).filter( key => scheduledMatchIds.indexOf(key) === -1)

  return unScheduledMatchIds.map( key => matches[key])
}

const getScheduledCourts = ( { courts, matches, players }) => {
  const courtsKeys = Object.keys(courts)

  return Object.keys(courts).map(key => {
    const court = courts[key]
    const courtMatches = court.matches.map(key => {
      const match = matches[key]

      // Replace `players` with the corresponding player object
      const matchPlayers = match.players.map(key => {
        return players[key]
      })

      return {
        ...match,
        players: matchPlayers
      }
    })

    return {
      ...court,
      matches: courtMatches
    }
  })
}


const mapStateToProps = (state) => ({
  unScheduledMatches: getUnScheduledMatches(state.program.program),
  scheduledCourts: getScheduledCourts(state.program.program),
  program: state.program.program
})

export default connect(
  mapStateToProps,
  {
    fetchProgram
  },
)(Program)
