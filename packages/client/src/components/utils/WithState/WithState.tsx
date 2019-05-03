import React, { createContext, PureComponent } from 'react'
import { reducers } from '../../../reducers'
import { Action, State as IState } from '../../../interfaces'

export const StateContext = createContext({})

export class StateProvider extends PureComponent {
  state: IState = {
    hasChosen: false,
    isWaiting: false,
    roomId: 0,
    player: {
      id: '',
      isHost: false,
      playerName: '',
    },
    players: [],
    choices: {},
    fields: {
      roomId: '',
      playerName: '',
    },
    dispatch: this.dispatch.bind(this),
  }

  dispatch(action: Action) {
    this.setState(() => {
      const { dispatch, ...stateValues } = this.state
      return reducers(stateValues as Exclude<IState, 'dispatch'>, action)
    })
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    )
  }
}

export const State = StateContext.Consumer

export const withState = (WrappedComponent: React.ComponentType) => (
  props: React.PropsWithChildren<{}>,
) => <State>{(state) => <WrappedComponent {...props} {...state} />}</State>
