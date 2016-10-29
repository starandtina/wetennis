import { connect } from 'react-redux'

import Program from '../components/Program'
import { fetchProgram, updateProgram, adjustMatch } from '../modules/program'

const getUnScheduledMatchIds = ({ courts, matches, players }) => {
  // Collect all of scheduled matches
  const scheduledMatchIds = Object.keys(courts).reduce((memo, courtId) => {
    return [...memo, ...courts[courtId].matches]
  }, [])

  return Object.keys(matches).filter( key => scheduledMatchIds.indexOf(key) === -1)
}

// const getScheduledCourts = ( { courts, matches, players }) => {
//   const courtsKeys = Object.keys(courts)

//   return Object.keys(courts).map(key => {
//     const court = courts[key]
//     const courtMatches = court.matches.map(key => {
//       const match = matches[key]

//       // Replace `players` with the corresponding player object
//       const matchPlayers = match.players.map(key => {
//         return players[key]
//       })

//       return {
//         ...match,
//         players: matchPlayers
//       }
//     })

//     return {
//       ...court,
//       matches: courtMatches
//     }
//   })
// }


const mapStateToProps = (state) => ({
  unScheduledMatchIds: getUnScheduledMatchIds(state.program),
  program: state.program
})

export default connect(
  mapStateToProps,
  {
    fetchProgram,
    updateProgram,
    adjustMatch
  },
)(Program)
