import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { State } from '../../../interfaces'
import { withState } from '../../utils/WithState/WithState'
import { Cards } from '../Cards/Cards'
import { Waiting } from '../Waiting/Waiting'
import { Results } from '../Results/Results'
import { compose } from '../../../helpers'

interface Props extends State {}

export const Poker = compose(
  memo,
  withState,
)(
  ({
    player,
    players,
    choices,
    hasChosen,
    isWaiting,
  }: Props): React.ReactElement => {
    if (!player || !player.id) return <Redirect noThrow to="/" />

    return (
      <section>
        {(() => {
          if (!hasChosen && !isWaiting) return <Cards />
          if (hasChosen && isWaiting)
            return <Waiting players={players} choices={choices} />
          if (hasChosen && !isWaiting)
            return (
              <Results player={player} players={players} choices={choices} />
            )
        })()}
      </section>
    )
  },
)
