import express from "express"
import * as http from "http"
import * as sock from "socket.io"
import * as path from "path"

import clicker from "./games/clicker/index"
import fingerBall from "./games/finger-ball/index"

import "dotenv/config"

const app = express()

const server = http.createServer(app)

const io = new sock.Server(server)

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))

io.on("connection", (socket) => {
  socket.on("newGame:clicker", (clientSize) => {
    clicker(io, socket, clientSize)
  })
  socket.on("newGame:finger-ball", (clientSize) => {
    fingerBall(io, socket, clientSize)
  })
})

server.listen(process.env.PORT, () => {
  console.log("listening on *:" + process.env.PORT)
})
