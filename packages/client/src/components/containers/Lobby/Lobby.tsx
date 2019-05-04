import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { compose, partial } from '../../../helpers'
import { State } from '../../../interfaces'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'
import { Button } from '@planning-poker/components'

interface Props extends Pick<State, 'player' | 'players'> {}

export const Lobby = compose(
  memo,
  withState,
)(
  ({ player, players }: Props): React.ReactElement<Props> => {
    if (!player || !player.id) return <Redirect noThrow to="/" />

    return (
      <section>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.playerName}</li>
          ))}
        </ul>

        {player.isHost && (
          <Actions>
            {({ startSession }): React.ReactElement => (
              <Button onClick={partial(startSession)}>Start session</Button>
            )}
          </Actions>
        )}
      </section>
    )
  },
)
