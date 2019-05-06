const { PLAY_CARD } = require('../types')

const newChoice = (state = [], action) => {
  switch (action.type) {
    case PLAY_CARD:
      return [...state, action.payload.playerId]

    default:
      return state
  }
}

const choices = (state = {}, action) => {
  switch (action.type) {
    case PLAY_CARD:
      const cardId = action.payload.cardId
      return { ...state, [cardId]: [...newChoice(state[cardId], action)] }

    default:
      return state
  }
}

module.exports = {
  choices,
}
