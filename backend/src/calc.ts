export interface Vector {
  x: number
  y: number
}

export function dist(v1: Vector, v2: Vector) {
  return sqr(v1.x - v2.x) + sqr(v1.y - v2.y)
}

export function angle(v1: Vector, v2: Vector) {
  const dy = v2.y - v1.y
  const dx = v2.x - v1.x
  let theta = Math.atan2(dy, dx) // range (-PI, PI]
  theta *= 180 / Math.PI // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta
}

export function fromAngle(angle: number, dist: number): Vector {
  return { x: dist * Math.cos(angle), y: dist * Math.sin(angle) }
}

export function sqr(value: number) {
  return value * value
}
