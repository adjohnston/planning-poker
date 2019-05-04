import styled from 'styled-components'

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const Item = styled.li`
  padding: 0.5rem;

  &:nth(2n) {
    background: #eee;
  }
`
