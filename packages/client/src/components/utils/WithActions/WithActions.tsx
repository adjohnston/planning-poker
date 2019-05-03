import React, { createContext, PureComponent } from 'react'
import { navigate } from '@reach/router'
import { client } from '../../../socket'
import { types } from '../../../types'
import * as actions from '../../../actions'
import { StateContext } from '../WithState/WithState'
import { Player } from '../../../interfaces'
import { Choices } from 'yargs'

interface Value {
  createRoom: Function
  joinRoom: Function
  startSession: Function
  playCard: Function
  newRound: Function
}

const { Provider, Consumer } = createContext({} as Value)

export class ActionsProvider extends PureComponent {
  static contextType = StateContext

  createRoom() {
    client.emit(types.CREATE_ROOM)
  }

  joinRoom(roomId: number, playerName: string) {
    client.emit(types.JOIN_ROOM, { roomId, playerName })
  }

  playCard(cardId: number) {
    client.emit(types.PLAY_CARD, { cardId })
  }

  startSession() {
    client.emit(types.START_SESSION)
  }

  newRound() {
    client.emit(types.NEW_ROUND)
  }

  componentDidMount() {
    client.on(types.SESSION_STARTED, () => {
      navigate('/poker')
    })

    client.on(types.ROOM_CREATED, ({ roomId }: { roomId: number }) => {
      this.context.dispatch(actions.roomCreated(roomId))
    })

    client.on(types.ROOM_JOINED, ({ player }: { player: Player }) => {
      this.context.dispatch(actions.roomJoined(player))
    })

    client.on(types.UPDATE_STATE, (newState: any) => {
      this.context.dispatch(actions.updateState(newState))
    })

    client.on(types.UPDATE_PLAYERS, ({ players }: { players: Player[] }) => {
      this.context.dispatch(actions.updatePlayers(players))
    })

    client.on(types.UPDATE_CHOICES, ({ choices }: { choices: Choices[] }) => {
      this.context.dispatch(actions.updateChoices(choices))
    })

    client.on(
      types.START_ROUND,
      ({ choices, hasChosen }: { choices: Choices[]; hasChosen: boolean }) => {
        this.context.dispatch(actions.startRound(choices, hasChosen))
      },
    )
  }

  render() {
    return (
      <Provider
        value={{
          createRoom: this.createRoom,
          joinRoom: this.joinRoom,
          startSession: this.startSession,
          playCard: this.playCard,
          newRound: this.newRound,
        }}>
        {this.props.children}
      </Provider>
    )
  }
}

export const Actions = Consumer
