import React, { memo } from 'react'
import { Card, List } from '@planning-poker/components'
import { partial } from '../../../helpers'
import { cards } from '../../../constants'
import { Actions } from '../../utils/WithActions/WithActions'

export const Cards = memo(() => (
  <Actions>
    {({ playCard }): React.ReactElement => (
      <List
        items={[
          ...cards.fibonacci.map((number) => (
            <Card key={number} onClick={partial(playCard, number)}>
              {number}
            </Card>
          )),

          ...Object.entries(cards.misc).map(([key, card]) => {
            const [emoji, description] = card

            return (
              <Card key={key} onClick={partial(playCard, key)}>
                <span role="img" aria-label={description}>
                  {emoji}
                </span>
              </Card>
            )
          }),
        ]}
      />
    )}
  </Actions>
))
