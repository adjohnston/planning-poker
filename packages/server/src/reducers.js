const {
  CREATE_ROOM,
  REMOVE_ROOM,
  JOIN_ROOM,
  PLAY_CARD,
  NEW_ROUND,
} = require('./types')
const { countPlayers } = require('./helpers')
const { players } = require('./reducers/players')
const { choices } = require('./reducers/choices')

const rootReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROOM: {
      const roomId = action.payload.roomId
      return {
        ...state,
        [roomId]: {
          id: roomId,
        },
      }
    }

    case REMOVE_ROOM: {
      const roomId = action.payload.roomId
      if (!roomId) return state
      if (roomId && countPlayers(state[roomId].players) === 0)
        delete state[roomId]
      return state
    }

    case JOIN_ROOM: {
      const roomId = action.payload.roomId
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          players: players(state[roomId].players, action),
        },
      }
    }

    case PLAY_CARD: {
      const roomId = action.payload.roomId
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          choices: choices(state[roomId].choices, action),
        },
      }
    }

    case NEW_ROUND: {
      const roomId = action.payload.roomId
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          choices: {},
        },
      }
    }

    default:
      return state
  }
}

module.exports = {
  reducers: rootReducers,
}
