import type { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import { config } from './config'
import { isDev } from './helpers/is-dev/is-dev'

type IO = (s: HttpServer) => Server

export const io: IO = server =>
  new Server(server, {
    cors: {
      origin: isDev(config) ? '*' : config.clientHostname,
    },
  })
