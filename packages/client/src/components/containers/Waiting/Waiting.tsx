import React, { memo } from 'react'
import { Player, Choices } from '../../../interfaces'
import {
  compose,
  partial,
  prop,
  filterIds,
  getPlayerIdsFromChoices,
} from '../../../helpers'

interface Props {
  players: Player[]
  choices: Choices
}

export const Waiting = memo(({ players, choices }: Props) => (
  <div>
    <p>Waiting on the following people to choose a card.</p>

    <ul>
      {compose(
        partial(filterIds, prop(players, 'id')),
        getPlayerIdsFromChoices,
      )(choices).map((playerId: string) => {
        const { playerName } = players.find((player) => player.id === playerId)!

        return <span key={playerId}>{playerName}</span>
      })}
    </ul>
  </div>
))
