import React, { memo, Fragment } from 'react'
import { List } from '@planning-poker/components'
import { State } from '../../../interfaces'
import { Actions } from '../../utils/WithActions/WithActions'

export interface Props extends Pick<State, 'player' | 'players' | 'choices'> {}

export const Results = memo(({ player, players, choices }: Props) => {
  const cardIds = Object.keys(choices)

  return (
    <div>
      {cardIds.length === 1 ? (
        <Fragment>
          <h2>
            The team has reached align-tenment!{' '}
            <span role="img" aria-label="Celebrate">
              🥳
            </span>
          </h2>
          <span>{cardIds.reduce((_, cardId) => cardId)}</span>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Choices</h2>
          <List
            items={cardIds.map((cardId) => (
              <li key={cardId}>
                <span>{cardId}</span>

                <div>
                  {choices[cardId].map((playerId) => {
                    const player = players.find(
                      (player) => player.id === playerId,
                    )

                    if (player)
                      return <span key={playerId}>{player.playerName}</span>

                    return null
                  })}
                </div>
              </li>
            ))}
          />
        </Fragment>
      )}

      {player.isHost && (
        <Actions>
          {({ newRound }: any) => <button onClick={newRound}>New round</button>}
        </Actions>
      )}
    </div>
  )
})
