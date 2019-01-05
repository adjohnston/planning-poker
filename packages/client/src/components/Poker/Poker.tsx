import React, { memo, ButtonHTMLAttributes } from 'react'
import { compose } from '../../helpers'
import { cards } from '../../constants'
import { withState } from '../WithState/WithState'
import { Actions } from '../WithActions/WithActions'

interface Props {
  hasChosen: boolean
  isWaiting: boolean
  choices: any[]
}

export const Poker = compose(
  memo,
  withState,
)((props: Props) => {
  if (!props.player || !props.player.id) return <Redirect noThrow to="/" />

  const { fibonacci, misc } = cards

  return (
    <section>
      { !props.hasChosen && !props.isWaiting && (
        <Actions>
          { ({ playCard }: any): any => (
            <ul>
              { fibonacci.map((number) => (
                <li key={number} onClick={partial(playCard, number)}>
                  {number}
                </li>
              )) }

              { Object.entries(misc).map(([ key, copy ]) => (
                <li key={key}>
                  <button onClick={partial(playCard, key)}>
                    {copy}
                  </button>
                </li>
              )) }
            </ul>
          ) }
        </Actions>
      ) }

      { props.hasChosen && props.isWaiting && (
        <div>
          <p>Waiting on the following people to choose a card.</p>

          <ul>
            {}
          </ul>
        </div>
      ) }

      { props.hasChosen && !props.isWaiting && (
        props.choices.length === 1 ? (
          <div>Alignment!</div>
        ) : (
          <div>Choices</div>
        )
      ) }
    </section>
  )
})