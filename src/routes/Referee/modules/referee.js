import {
  handleActions
} from 'redux-actions'

import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REFEREE = 'FETCH_REFEREE'
export const FETCH_REFEREE_SUCCESS = 'FETCH_REFEREE_SUCCESS'
export const FETCH_REFEREE_FAILTURE = 'FETCH_REFEREE_FAILTURE'

export const OPERATE_REFEREE = 'OPERATE_REFEREE'
export const OPERATE_REFEREE_SUCCESS = 'OPERATE_REFEREE_SUCCESS'
export const OPERATE_REFEREE_FAILTURE = 'OPERATE_REFEREE_FAILTURE'

export const FOREHAND_REFEREE = 'FOREHAND_REFEREE'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchReferee = (data) => ({
  types: [FETCH_REFEREE, FETCH_REFEREE_SUCCESS, FETCH_REFEREE_FAILTURE],
  promise: () => API.post(URLConf.fetchReferee, { ...data })
})

export const operateReferee = (data) => ({
  types: [OPERATE_REFEREE, OPERATE_REFEREE_SUCCESS, OPERATE_REFEREE_FAILTURE],
  promise: () => API.post(URLConf.operateReferee, { ...data }),
  playerId: data.id
})

// Forehand
export const forehandReferee = (data) => ({
  types: [FOREHAND_REFEREE, OPERATE_REFEREE_SUCCESS, OPERATE_REFEREE_FAILTURE],
  promise: () => API.post(URLConf.operateReferee, { ...data }),
  playerId: data.id
})


const initialState = {
  players: [{
      gameScores: [0, 0, 0, 0, 0]
    }, {
      gameScores: [0, 0, 0, 0, 0]
    }
  ]
}

export default handleActions({
  [FETCH_REFEREE]: (state, action) => ({
    ...state
  }),
  [FETCH_REFEREE_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [OPERATE_REFEREE]: (state, action) => {
    const playerId = action.playerId
    const player = state.players.find((p) => p.id === playerId)
    const nextPlayer = state.players.find((p) => p.id !== playerId)

    // [10, 30, 40, 60]
    player.livingScore +=10

    return {
      ...state,
      currentPlayerId: nextPlayer.id
    }
  },
  [OPERATE_REFEREE_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
}, initialState)
