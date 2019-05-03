import React, { memo } from 'react'
import { partial } from '../../../helpers'
import { cards } from '../../../constants'
import { Actions } from '../../utils/WithActions/WithActions'
import { Card } from '@planning-poker/components'

export const Cards = memo(() => (
  <Actions>
    {({ playCard }: { playCard: Function }): React.ReactElement => (
      <ul>
        {cards.fibonacci.map((number) => (
          <li key={number}>
            <Card onClick={partial(playCard, number)}>{number}</Card>
          </li>
        ))}

        {Object.entries(cards.misc).map(([key, card]) => {
          const [emoji, description] = card

          return (
            <li key={key}>
              <Card onClick={partial(playCard, key)}>{copy}</Card>
            </li>
          )
        })}
      </ul>
    )}
  </Actions>
))
