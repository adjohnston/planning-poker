import React, { memo, Fragment } from 'react'
import { State } from '../../../interfaces'
import { Actions } from '../../utils/WithActions/WithActions'

interface Props extends Pick<State, 'player' | 'players' | 'choices'> {}

export const Results = memo(({ player, players, choices }: Props) => {
  const cardIds = Object.keys(choices)

  return (
    <div>
      {cardIds.length === 1 ? (
        <Fragment>
          <h2>The team has reached align-tenment! 🥳</h2>
          <span>{cardIds.reduce((_, cardId) => cardId)}</span>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Choices</h2>
          <ul>
            {cardIds.map((cardId) => (
              <li key={cardId}>
                <span>{cardId}</span>

                <div>
                  {choices[cardId].map((playerId) => {
                    const { playerName } = players.find(
                      (player) => player.id === playerId,
                    )!

                    return <span key={playerId}>{playerName}</span>
                  })}
                </div>
              </li>
            ))}
          </ul>
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
