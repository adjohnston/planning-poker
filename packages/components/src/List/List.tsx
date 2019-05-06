import React, { memo } from 'react'
import { List as StyledList, Item } from './List.styles'

export interface Props {
  items: React.ReactNode[]
  className: string
}

const renderItem = (node: React.ReactNode, index: number) => {
  return <Item key={index}>{node}</Item>
}

export const List = memo(
  ({ items, className }: Props): React.ReactElement => {
    return (
      <StyledList className={className}>{items.map(renderItem)}</StyledList>
    )
  },
)
