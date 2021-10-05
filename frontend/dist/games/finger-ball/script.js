var socket = io()

const game = "finger-ball"

socket.emit(`newGame:${game}`, {
  x: document.body.clientWidth,
  y: document.body.clientHeight,
})

const ball = document.getElementById("ball")

ball.onclick = (event) => {
  socket.emit(game, "ballClick", { x: event.clientX, y: event.clientY })
}

socket.on(game, (event, ctx) => {
  console.log("event", event)
})
