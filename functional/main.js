var Mat4 = require('./mat4.js')
var Vec4 = require('./vec4.js')
var operate = require('./operate.js')
require('./dat.gui.js')

var pts = [
  Vec4(-1, -1, -1, 1),
  Vec4(1, -1, -1, 1),
  Vec4(-1, 1, -1, 1),
  Vec4(1, 1, -1, 1),
  Vec4(-1, -1, 1, 1),
  Vec4(1, -1, 1, 1),
  Vec4(-1, 1, 1, 1),
  Vec4(1, 1, 1, 1)
]

var edges = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [0, 2],
  [1, 3],
  [4, 6],
  [5, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7]
]

var w, h, canvas, context

var DISTANCE_FROM_CAMERA_TO_CANVAS, FOV, ASPECT, NEAR, FAR, transformMatrix

//var gui = new dat.GUI()
//gui.add(text, '')

function init() {
  canvas = document.getElementById('canvas1')
  w = canvas.width
  h = canvas.height
  context = canvas.getContext('2d')
  DISTANCE_FROM_CAMERA_TO_CANVAS = 60
  DISTANCE_FROM_CAMERA_TO_ZERO = 30
  FOV = 45
  ASPECT = w / h
  NEAR = 10
  FAR = 220
  STAGE = 0
}

function depthPerspective(p) {
  var focalLength = 8.0
  var pz = focalLength / (focalLength - p[2])
  return [p[0] * pz, p[1] * pz, pz]
}

window.onkeydown = function (e) {
  switch (e.which) {
  case 65:
    STAGE = 0
    console.log(65)
    break
  case 66:
    STAGE = 1
    console.log(66)
    break
  case 67:
    STAGE = 2
    break
  case 68:
    STAGE = 3
    break
  case 69:
    STAGE = 4
    break
  }
}

function switchMatrix(time, x, y) {
  switch (STAGE) {
  case 0:
    transformMatrix = Mat4.translate(x, y, 0)
    break
  case 1:
    transformMatrix = Mat4.rotateX(x)
    break
  case 2:
    transformMatrix = Mat4.rotateY(y)
    break
  case 3:
    transformMatrix = Mat4.rotateZ(x)
    break
  case 4:
    transformMatrix = Mat4.scale(x, x, 1)
    break
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  var time = Date.now() * 0.001
  var x = Math.cos(time) / 2
  var y = Math.sin(time) / 2
  switchMatrix(time, x, y)

  var eyeMatrix = Mat4.translate(0, 0, DISTANCE_FROM_CAMERA_TO_ZERO)
  var projectionMatrix = Mat4.perspective(FOV, ASPECT, NEAR, FAR)

  for (var i = 0; i < edges.length; i++) {

    var p0 = operate.multiply(Mat4.inverse(eyeMatrix), operate.multiply(transformMatrix, pts[edges[i][0]]))
    var p1 = operate.multiply(Mat4.inverse(eyeMatrix), operate.multiply(transformMatrix, pts[edges[i][1]]))
      // var p0 = operate.multiply(eyeMatrix, operate.multiply(translateMatrix, pts[edges[i][0]]))
      // var p1 = operate.multiply(eyeMatrix, operate.multiply(translateMatrix, pts[edges[i][1]]))

    // var a = depthPerspective(p0)
    // var b = depthPerspective(p1)
    //
    console.log(p0)
    var a = operate.multiply(projectionMatrix, p0)
    var b = operate.multiply(projectionMatrix, p1)
      // var a = [],
      //   b = []

    // a[0] = p0[0] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
    // a[1] = p0[1] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
    // a[2] = DISTANCE_FROM_CAMERA_TO_CANVAS - DISTANCE_FROM_CAMERA_TO_ZERO
    // b[0] = p1[0] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
    // b[1] = p1[1] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
    // b[2] = DISTANCE_FROM_CAMERA_TO_CANVAS - DISTANCE_FROM_CAMERA_TO_ZERO
    // console.log(a)

    // var a = p0
    // var b = p1
    context.beginPath()
    context.moveTo(viewport(a)[0], viewport(a)[1])
    context.lineTo(viewport(b)[0], viewport(b)[1])
    context.stroke()
  }
}

function viewport(p) {
    var out = [];
    out[0] = (w / 2) + p[0] / p[2] * (w / 2)
    out[1] = (h / 2) - p[1] / p[2] * (w / 2)
    return out
  }
  // function viewport(p) {
  //   var out = [];
  //   out[0] = (w / 2) + p[0] * (w / 2)
  //   out[1] = (h / 2) - p[1] * (w / 2)
  //   return out
  // }

function animate() {
  requestAnimationFrame(animate)
  render()
}

init()
animate()