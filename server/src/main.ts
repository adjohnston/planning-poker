import { createServer } from 'http'
import { Server } from 'socket.io'

const server = createServer()
const io = new Server(server)

io.on('connect', socket => {
  socket.on('HI', () => {
    socket.emit('WAVE')
  })
})

server.listen(8080, () => console.log('I live'))
