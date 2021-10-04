var socket = io()

const button = document.getElementById("button")

button.onclick = () => {
  console.log("buttonClick")
  socket.emit("buttonClick")
}

socket.on("buttonClick:ok", (ctx) => {
  console.log("buttonClick:ok")

  let counter = document.getElementById(ctx.id) || document.createElement("div")

  counter.id = ctx.id
  counter.className = "counter"
  counter.innerHTML = String(ctx.clicks)

  document.getElementById("counters").prepend(counter)
})
