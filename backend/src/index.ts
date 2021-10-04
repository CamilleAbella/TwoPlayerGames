import express from "express"
import * as http from "http"
import * as sock from "socket.io"
import * as path from "path"
import * as uuid from "uuid"

import "dotenv/config"

const app = express()

const server = http.createServer(app)

const io = new sock.Server(server)

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))

io.on("connection", (socket) => {
  const ctx: PlayerContext = {
    id: uuid.v4(),
    clicks: 0,
  }

  socket.on("buttonClick", () => {
    ctx.clicks++

    io.emit("buttonClick:ok", ctx)
  })
})

server.listen(process.env.PORT, () => {
  console.log("listening on *:" + process.env.PORT)
})

interface PlayerContext {
  id: string
  clicks: number
}
