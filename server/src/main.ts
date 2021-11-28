import { createServer, Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import { config } from './config'
import { io } from './io'
import { listeners } from './listeners'

const server: Server = createServer()

type Main = (s: Server) => (io: SocketServer) => void

const main: Main = server => io => {
  listeners(io)

  server.listen(config.port, () =>
    console.log(`Server running on port: ${config.port}`),
  )
}

if (require.main) {
  main(server)(io(server))
}
