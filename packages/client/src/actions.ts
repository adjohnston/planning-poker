import { types } from './types'
import { Action, Player, Fields } from './interfaces'

export const updateField = (field: Fields, value: string): Action => ({
  type: types.UPDATE_FIELD,
  payload: { field, value },
})

export const roomCreated = (roomId: number): Action => ({
  type: types.ROOM_CREATED,
  payload: roomId,
})

export const roomJoined = (player: Player): Action => ({
  type: types.ROOM_JOINED,
  payload: player,
})

export const updatePlayers = (players: Player[]): Action => ({
  type: types.UPDATE_PLAYERS,
  payload: players,
})

export const updateChoices = (choices: any[]): Action => ({
  type: types.UPDATE_CHOICES,
  payload: choices,
})

export const updateState = (newState: any): Action => ({
  type: types.UPDATE_STATE,
  payload: newState,
})

export const startRound = (choices: any[], hasChosen: boolean): Action => ({
  type: types.START_ROUND,
  payload: { choices, hasChosen },
})
