import * as uuid from "uuid"
import * as sock from "socket.io"
import * as calc from "../../calc"

const game = "finger-ball"

interface FingerBallPlayerContext {
  id: string
  ball: {
    radius: number
    position: calc.Vector
    speed: calc.Vector
    velocity: calc.Vector
  }
}

export default function (
  io: sock.Server,
  socket: sock.Socket,
  clientSize: calc.Vector
) {
  const ctx: FingerBallPlayerContext = {
    id: uuid.v4(),
    ball: {
      radius: 100,
      position: { x: NaN, y: NaN },
      speed: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
    },
  }

  let loop = setInterval(() => {
    // todo: calc gravity and bounds
    // todo: send new position of ball
  }, 1000 / 60)

  socket.on(game, (event, ...args) => {
    if (event === "ballClick") {
      const [clickPosition] = args

      const angle = calc.angle(ctx.ball.position, clickPosition)
      const dist = calc.dist(ctx.ball.position, clickPosition)

      if (dist > ctx.ball.radius) return

      ctx.ball.speed = calc.fromAngle(angle, dist)

      io.emit(game, "returnBall", ctx)
    }
  })
}
