import { Server, Socket } from 'socket.io'
import { create } from './handlers/create/create'
import { join } from './handlers/join/join'

type Listeners = (io: Server) => void

export const listeners: Listeners = io => {
  io.on('connection', (socket: Socket): void => {
    create(io)(socket)
    join(io)(socket)
  })
}
