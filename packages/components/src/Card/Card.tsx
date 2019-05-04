import React from 'react'
import { Container, Inner } from './Card.styles'

export interface Props {
  clickHandler: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>
  children: React.ReactChildren
}

export const Card = React.memo(({ clickHandler, children }: Props) => {
  return (
    <Container onClick={clickHandler}>
      <Inner>{children}</Inner>
    </Container>
  )
})
