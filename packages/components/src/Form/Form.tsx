import React from 'react'
import { FieldSet, Legend, Field, Label, Input } from './Form.styles'

export interface Field {
  id: string
  label: string
  type: 'text' | 'number'
  onChange: React.ReactEventHandler
  value: string
}

export interface Props {
  fields: Field[]
  children?: React.ReactChild
  onSubmit?: React.ReactEventHandler
  legend?: string
}

const handleSubmit = (
  event: React.SyntheticEvent<HTMLFormElement>,
  onSubmit?: Function,
) => {
  event.preventDefault()
  onSubmit && onSubmit(event)
}

const renderField = ({ type = 'text', id, label, onChange, value }: Field) => {
  return (
    <Field key={id}>
      <Label>{label}</Label>
      <Input type={type} onChange={onChange} value={value} />
    </Field>
  )
}

export const Form = ({ fields, onSubmit, legend, children }: Props) => {
  return (
    <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
      <FieldSet>
        {legend && <Legend>{legend}</Legend>}
        {fields.map(renderField)}
        {children}
      </FieldSet>
    </form>
  )
}

Form.defaultProps = {
  onSubmit: () => {},
}
