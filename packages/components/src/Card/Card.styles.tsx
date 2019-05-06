import styled from 'styled-components'

export const Container = styled.button`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
`

export const Inner = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
