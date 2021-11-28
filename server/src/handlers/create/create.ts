import { Server, Socket } from 'socket.io'
import { publish, subscribe } from '../../constants'
import { generateLobbyCode } from '../../helpers/generate-lobby-code/generate-lobby-code'

type Create = (io: Server) => (socket: Socket) => void

/**
 * Create a lobby
 * ==============
 * A lobby is a place for members of the team to join before kicking off a
 * planning poker session. They'll be able to set their name useful for the
 * host to know who has yet to choose a card.
 */
export const create: Create = io => socket => {
  socket.on(subscribe.create, (): void => {
    const code = generateLobbyCode(3)

    socket.join(code)
    io.to(code).emit(publish.created, { code })
  })
}
