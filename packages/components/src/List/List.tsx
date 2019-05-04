import React, { memo } from 'react'
import { List as StyledList, Item } from './List.styles'

export interface Props {
  items: React.ReactNode[]
}

const renderItem = (node: React.ReactNode, index: number) => {
  return <Item key={index}>{node}</Item>
}

export const List = memo(
  ({ items }: Props): React.ReactElement => {
    return <StyledList>{items.map(renderItem)}</StyledList>
  },
)
