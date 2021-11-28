import { createServer, Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import { io as client, Socket } from 'socket.io-client'
import { listeners } from '../src/listeners'

const port = '8081'

describe('Create game', () => {
  let server: Server
  let io: SocketServer
  let host: Socket

  beforeEach(() => {
    server = createServer()
    io = new SocketServer(server)

    listeners(io)
    server.listen(port)
  })

  afterEach(() => {
    host.close()
    server.close()
  })

  test('a host can create a session and receive a lobby code', done => {
    host = client(`http://localhost:${port}`)
    host.emit('CREATE')
    host.once('CREATED', response => {
      expect(response).toStrictEqual({
        code: expect.stringMatching(/[a-z0-9]{3}/),
      })

      done()
    })
  })
})
