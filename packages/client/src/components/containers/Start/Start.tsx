import React, { memo, Fragment } from 'react'
import { redirectTo, Redirect } from '@reach/router'
import { Button, Form } from '@planning-poker/components'
import { compose, partial } from '../../../helpers'
import { State } from '../../../interfaces'
import { updateField, roomCreated } from '../../../actions'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'

interface Props extends State {}

const isDisabled = (roomId: number) => String(roomId).length !== 3

export const Start = compose(
  memo,
  withState,
)((props: Props) => {
  if (props.roomId !== 0) return <Redirect noThrow to="/name" />

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    props.dispatch(updateField('roomId', value))
  }

  const navigateToName = () => {
    props.dispatch(roomCreated(Number(props.fields.roomId)))
    redirectTo('/name')
  }

  return (
    <Fragment>
      <Form
        legend="Join a planning poker session"
        fields={[
          {
            id: 'room-id',
            label: 'Session pin',
            onChange: changeHandler,
            value: props.fields.roomId,
          },
        ]}>
        <Actions>
          {() => (
            <Button
              onClick={navigateToName}
              disabled={isDisabled(Number(props.fields.roomId))}>
              Join session
            </Button>
          )}
        </Actions>
      </Form>

      <Fragment>
        <p>
          If you don’t have a session, you can host one for you and your team.
        </p>

        <Actions>
          {({ createRoom }) => (
            <Button onClick={partial(createRoom)}>Host session</Button>
          )}
        </Actions>
      </Fragment>
    </Fragment>
  )
})
