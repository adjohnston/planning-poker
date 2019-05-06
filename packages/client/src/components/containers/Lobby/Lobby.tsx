import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { Button, List } from '@planning-poker/components'
import { compose, partial, prop } from '../../../helpers'
import { State } from '../../../interfaces'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'

export interface Props extends Pick<State, 'player' | 'players'> {}

export const Lobby = compose(
  memo,
  withState,
)(
  ({ player, players }: Props): React.ReactElement<Props> => {
    if (!player || !player.id) return <Redirect noThrow to="/" />

    return (
      <section>
        <List items={prop(players, 'playerName')} />

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
