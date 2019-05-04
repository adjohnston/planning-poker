import React, { memo } from 'react'
import { Button as StyledButton } from './Button.styles'

export const Button = memo((props) => {
  return <StyledButton {...props} />
})
