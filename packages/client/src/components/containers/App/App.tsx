import React, { Component } from 'react'
import { Router } from '@reach/router'
import { Start } from '../Start/Start'
import { Name } from '../Name/Name'
import { Lobby } from '../Lobby/Lobby'
import { Poker } from '../Poker/Poker'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Start path="/" />
          <Name path="/name" />
          <Lobby path="/lobby" />
          <Poker path="/poker" />
        </Router>
      </main>
    )
  }
}

export default App
