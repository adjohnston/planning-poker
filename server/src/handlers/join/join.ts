import { Server, Socket } from 'socket.io'
import { publish, subscribe } from '../../constants'

type Join = (io: Server) => (socket: Socket) => void

export const join: Join = io => socket => {
  socket.on(subscribe.join, ({ code }): void => {
    socket.join(code)
    io.to(code).emit(publish.joined)
  })
}
