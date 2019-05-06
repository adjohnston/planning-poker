import io from 'socket.io-client'

export const client = io.connect('http://localhost:8000')
