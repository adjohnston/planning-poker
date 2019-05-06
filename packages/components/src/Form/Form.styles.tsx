import styled from 'styled-components'

export const FieldSet = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
`

export const Legend = styled.legend`
  position: absolute;
  height: 1px;
  clip-path: polygon(0 0);
`

export const Field = styled.label`
  display: block;
`

export const Label = styled.span`
  display: block;
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
`
export const Input = styled.input`
  display: block;
  width: 100%;
  height: 2rem;
  padding: 0 0.25rem;
  border: 2px solid currentColor;
  border-radius: 0.25rem;
`
