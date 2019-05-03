import React, { memo } from 'react'
import { partial } from '../../../helpers'
import { cards } from '../../../constants'
import { Actions } from '../../utils/WithActions/WithActions'

export const Cards = memo(() => (
  <Actions>
    {({ playCard }: { playCard: Function }): React.ReactElement => (
      <ul>
        {cards.fibonacci.map((number) => (
          <li key={number}>
            <button onClick={partial(playCard, number)}>{number}</button>
          </li>
        ))}

        {Object.entries(cards.misc).map(([key, copy]) => (
          <li key={key}>
            <button onClick={partial(playCard, key)}>{copy}</button>
          </li>
        ))}
      </ul>
    )}
  </Actions>
))
