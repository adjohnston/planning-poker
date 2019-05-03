import React, { memo, Fragment } from 'react'
import { redirectTo, Redirect } from '@reach/router'
import { compose } from '../../../helpers'
import { updateField, roomCreated } from '../../../actions'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'
import { State } from '../../../interfaces'

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
      <form>
        <fieldset>
          <legend>Join a planning poker session</legend>

          <label>
            <span>Session Pin</span>
            <input
              type="text"
              onChange={changeHandler}
              value={props.fields.roomId}
            />
          </label>

          <Actions>
            {() => (
              <button
                onClick={navigateToName}
                disabled={isDisabled(Number(props.fields.roomId))}>
                Join session
              </button>
            )}
          </Actions>
        </fieldset>
      </form>

      <Fragment>
        <p>
          If you don’t have a session, you can host one for you and your team.
        </p>

        <Actions>
          {({ createRoom }) => (
            <button onClick={() => createRoom()}>Host session</button>
          )}
        </Actions>
      </Fragment>
    </Fragment>
  )
})
