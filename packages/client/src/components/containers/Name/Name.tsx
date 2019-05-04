import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { Button, Form } from '@planning-poker/components'
import { compose, partial } from '../../../helpers'
import { State } from '../../../interfaces'
import { updateField } from '../../../actions'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'

interface Props extends State {}

const isDisabled = (name: string) => name.length <= 2

export const Name = compose(
  memo,
  withState,
)((props: Props) => {
  if (props.roomId === 0) return <Redirect noThrow to="/" />
  if (props.player && props.player.id) return <Redirect noThrow to="/lobby" />

  const changeHandler = (dispatch: Function) => (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const value = event.currentTarget.value
    dispatch(updateField('playerName', value))
  }

  return (
    <section>
      <div>
        <span>Your pin!</span> <strong>{props.roomId}</strong>
      </div>

      <Form
        legend="Let others know who you are."
        fields={[
          {
            id: 'your-name',
            label: 'Your name',
            onChange: changeHandler(props.dispatch),
            value: props.fields.playerName,
          },
        ]}>
        <Actions>
          {({ joinRoom }: any) => (
            <Button
              onClick={partial(joinRoom, props.roomId, props.fields.playerName)}
              disabled={isDisabled(props.fields.playerName)}>
              Let’s go!
            </Button>
          )}
        </Actions>
      </Form>
    </section>
  )
})
