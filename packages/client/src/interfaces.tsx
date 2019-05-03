export interface Player {
  id: string
  isHost: boolean
  playerName: string
}

export interface Choices {
  [key: string]: string[]
}

export interface State {
  hasChosen: boolean
  isWaiting: boolean
  roomId: number
  player: Player
  players: Player[]
  choices: Choices
  fields: {
    roomId: string
    playerName: string
  }
  dispatch: Function
}

export interface Action {
  type: string
  payload?: any
}

export type Fields = 'roomId' | 'playerName'
