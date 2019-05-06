const Server = require('socket.io')
const { createStore } = require('redux')
const types = require('./types')
const actions = require('./actions')
const { reducers } = require('./reducers')
const {
  createRoomId,
  createPlayerId,
  countPlayers,
  countChoices,
} = require('./helpers')

const store = createStore(reducers)
const io = new Server(8000, { origins: '*:3000' })

io.on('connect', (socket) => {
  socket.on(types.CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState())
    const roomId = createRoomId(roomIds)

    socket.join(roomId)
    socket.roomId = roomId
    socket.actions = actions(roomId)
    store.dispatch(socket.actions.createRoom())
    socket.emit(types.ROOM_CREATED, { roomId })
  })

  socket.on(types.JOIN_ROOM, ({ roomId, playerName }) => {
    const players = store.getState()[roomId].players
    const playerIds = Object.keys(players || {})

    socket.join(roomId)
    socket.roomId = roomId
    socket.actions = actions(roomId)
    socket.playerId = createPlayerId(playerIds)
    store.dispatch(socket.actions.joinRoom(socket.playerId, playerName))

    const updatedPlayers = store.getState()[roomId].players

    io.to(roomId).emit(types.UPDATE_PLAYERS, {
      players: Object.values(updatedPlayers),
    })
    socket.emit(types.ROOM_JOINED, { player: updatedPlayers[socket.playerId] })
  })

  socket.on(types.START_SESSION, () => {
    io.to(socket.roomId).emit(types.SESSION_STARTED)
  })

  socket.on(types.PLAY_CARD, ({ cardId }) => {
    store.dispatch(socket.actions.playCard(socket.playerId, cardId))
    socket.emit(types.UPDATE_STATE, { hasChosen: true, isWaiting: true })

    const { players, choices } = store.getState()[socket.roomId]

    io.to(socket.roomId).emit(types.UPDATE_CHOICES, { choices })

    if (countPlayers(players) === countChoices(choices)) {
      io.to(socket.roomId).emit(types.UPDATE_STATE, { isWaiting: false })
    }
  })

  socket.on(types.NEW_ROUND, () => {
    store.dispatch(socket.actions.newRound())

    const choices = store.getState()[socket.roomId].choices

    io.to(socket.roomId).emit(types.START_ROUND, {
      choices,
      hasChosen: false,
    })
  })

  socket.on('disconnect', () => {
    if (socket.roomId) store.dispatch(socket.actions.removeRoom())
  })
})

console.log('Server running on 8000')
