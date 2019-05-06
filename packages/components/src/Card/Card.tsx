import React from 'react'
import { Container, Inner } from './Card.styles'

export interface Props {
  onClick: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>
  children: React.ReactChildren
}

export const Card = React.memo(({ onClick, children }: Props) => {
  return (
    <Container onClick={onClick}>
      <Inner>{children}</Inner>
    </Container>
  )
})
