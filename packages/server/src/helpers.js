function flatMap(collection, cb) {
  return collection.reduce((prev, curr) => prev.concat(cb(curr)), [])
}

function generateId(min = 100, max = 999) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function collectionContainsKey(collection, key) {
  return collection.includes(key)
}

function countPlayers(players = {}) {
  return Object.keys(players).length
}

function countChoices(choices = {}) {
  const entries = Object.entries(choices)
  return flatMap(entries, ([cardId, playerIds]) => playerIds).length
}

function createRoomId(rooms) {
  const id = generateId()
  return !collectionContainsKey(rooms, id) ? id : createRoomId(rooms)
}

function createPlayerId(players) {
  const id = generateId(0)
  return !collectionContainsKey(players, id) ? id : createPlayerId(players)
}

module.exports = {
  generateId,
  collectionContainsKey,
  countPlayers,
  countChoices,
  createRoomId,
  createPlayerId,
}
