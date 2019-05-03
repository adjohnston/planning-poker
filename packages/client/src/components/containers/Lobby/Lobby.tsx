import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { compose } from '../../../helpers'
import { State } from '../../../interfaces'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'

interface Props extends Pick<State, 'player' | 'players'> {}

export const Lobby = compose(
  memo,
  withState,
)(
  ({ player, players }: Props): React.ReactElement<Props> => {
    if (!player || !player.id) return <Redirect noThrow to="/" />

    return (
      <section>
        {player.isHost && (
          <Actions>
            {({ startSession }): React.ReactElement => (
              <button onClick={() => startSession()}>Start session</button>
            )}
          </Actions>
        )}

        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.playerName}</li>
          ))}
        </ul>
      </section>
    )
  },
)
