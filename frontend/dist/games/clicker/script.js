var socket = io()

const game = "clicker"

socket.emit(`newGame:${game}`, {
  x: document.body.clientWidth,
  y: document.body.clientHeight,
})

const button = document.getElementById("button")

button.onclick = () => {
  socket.emit(game, "buttonClick")
}

socket.on(game, (event, ctx) => {
  console.log("event", event)

  if (event === "refreshStats") {
    let counter = document.getElementById(ctx.id)

    if (!counter) {
      counter = document.createElement("div")
      document.getElementById("counters").prepend(counter)
    }

    counter.id = ctx.id
    counter.className = "counter"
    counter.innerHTML = String(ctx.clicks)
  }
})
