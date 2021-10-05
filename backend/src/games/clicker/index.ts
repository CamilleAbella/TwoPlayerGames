import * as uuid from "uuid"
import * as sock from "socket.io"
import * as color from "color-engine"

const game = "clicker"

interface ClickerPlayerContext {
  id: string
  clicks: number
  color: string
}

export default function (io: sock.Server, socket: sock.Socket, event: string) {
  const ctx: ClickerPlayerContext = {
    id: uuid.v4(),
    clicks: 0,
    color: color.Color.random().hexString,
  }

  socket.on(game, (event, ...args) => {
    if (event === "buttonClick") {
      ctx.clicks++

      io.emit(game, "buttonClick", ctx)
    }
  })
}
