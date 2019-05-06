import styled from 'styled-components'
import { List } from '@planning-poker/components'

export const Hand = styled(List)`
  display: grid;
  min-height: 100vh;
  grid-template: 'card card';

  @media (min-width: 48em) {
    grid-template: 'card card card';
  }

  @media (min-width: 64.25em) {
    grid-template: 'card card card card';
  }
`
