(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/karen/Documents/my_project/matrix/functional/main.js":[function(require,module,exports){
var Mat4 = require('./mat4.js')
var Vec4 = require('./vec4.js')
var operate = require('./operate.js')

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

theta = 0
var oo = []
var ood = []
  // for (var i = 0; i < 12; i++) {
  //   oo.push(Vec4(Math.cos(theta), 1, Math.sin(theta), 1))
  //     //oo.push(Vec4(Math.cos(theta), -1, Math.sin(theta), 1))
  //   theta += Math.PI / 6
  // }
  // ood = [
  //   // [0, 1],
  //   // [2, 3],
  //   // [4, 5],
  //   // [6, 7],
  //   // [8, 9],
  //   // [10, 11],
  //   // [12, 13],
  //   // [14, 15],
  //   // [16, 17],
  //   // [18, 19],
  //   // [20, 21],
  //   // [22, 23],

//   // [0, 2],
//   // [2, 4],
//   // [4, 6],
//   // [6, 8],
//   // [8, 10],
//   // [10, 12],
//   // [12, 14],
//   // [14, 16],
//   // [16, 18],
//   // [18, 20],
//   // [20, 22]
//   //[22, 0]

//   // [1, 3],
//   // [3, 5],
//   // [5, 7],
//   // [7, 9],
//   // [9, 11],
//   // [11, 13],
//   // [13, 15],
//   // [15, 17],
//   // [17, 19],
//   // [19, 21],
//   // [22, 23],
//   // [23, 1]
// ]

// for (var i = 0; i < 12; i++) {

// ood = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [5, 6],
//   [6, 7],
//   [7, 8],
//   [8, 9],
//   [9, 10],
//   [10, 11],
//   [11, 0]

//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [5, 6],
//   [6, 7],
//   [7, 8],
//   [8, 9],
//   [9, 10],
//   [10, 11],
//   [11, 0]
// ]

for (var i = 0; i < 12; i++) {
  oo.push(Vec4(Math.cos(theta) / 2, 1, Math.sin(theta) / 2, 1))
    //console.log(oo[i][0])
  theta += Math.PI / 6
    //console.log(oo[i])
}

for (var i = 0; i < oo.length - 1; i++) {
  ood.push([i, i + 1])
}
ood.push([oo.length - 1, 0])

//console.log(ood)

var oldLength = oo.length

for (var i = oldLength; i < oldLength + 12; i++) {
  oo.push(Vec4(Math.cos(theta) / 2, -1, Math.sin(theta) / 2, 1))
  theta += Math.PI / 6
    //console.log(oo[i])
}

for (var i = oldLength; i < oo.length - 1; i++) {
  ood.push([i, i + 1])
}
ood.push([oo.length - 1, oldLength])
  //console.log(ood)
  // for (var i = 0; i < ood.length; i++) {
  //   console.log(ood[i][0])
  // }
for (var i = 0; i < oldLength; i++) {
  ood.push([i, i + oldLength])
}

console.log(ood)

//console.log(oo.length)
ood.forEach(function (item) {
    console.log(item[0], item[1])
  })
  // oo.forEach(function (item) {
  //   console.log(item[0], item[2])
  // })
var w, h, canvas, context

var DISTANCE_FROM_CAMERA_TO_CANVAS, FOV, ASPECT, NEAR, FAR, transformMatrix

//var gui = new dat.GUI()
//gui.add(text, '')
//console.log(oo.length + ' ' + ood.length)
var shoulder = Vec4(0, 0, 0, 1)
var elbow = Vec4(0, 0, 0, 1)
var fingerTip = Vec4()

function init() {
  canvas = document.getElementById('canvas1')
  w = canvas.width
  h = canvas.height
  context = canvas.getContext('2d')
  DISTANCE_FROM_CAMERA_TO_CANVAS = 60
  DISTANCE_FROM_CAMERA_TO_ZERO = 3
  FOV = 45
  ASPECT = w / h
  NEAR = 10
  FAR = 220
  STAGE = 0

  var count = 0

  //console.log(oo[ood[25][1]])

  function justforyou(p) {
    //console.log(count + ' ' + p)
    var out = []
    out[0] = (w / 2) + p[0] * (w / 2)
    out[1] = p[1]
    out[2] = (h / 2) - p[2] * (w / 2)
      //console.log(out)
    count++
    return out
  }

  for (var i = 0; i < oo.length; i++) {
    var newp = justforyou(oo[i])
      //console.log(newp[0], newp[2])
    context.beginPath()
    context.lineWidth = "2";
    context.strokeStyle = "red";
    context.fillText(i, newp[0], newp[2])
    context.stroke()
  }

  var counter = 0
  for (var i = 0; i < ood.length; i++) {

    context.beginPath()
    var p0 = justforyou(oo[ood[i][0]])
    context.moveTo(p0[0], p0[2])
    var p1 = justforyou(oo[ood[i][1]])
      // console.log(counter)
      // console.log(oo[ood[i][1]])
    context.lineTo(p1[0], p1[2])
    context.stroke()
    counter++
  }
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
    matrixStack.push(transformMatrix)
    break
  case 1:
    transformMatrix = Mat4.rotateX(x)
    matrixStack.push(transformMatrix)
    break
  case 2:
    transformMatrix = Mat4.rotateY(y)
    matrixStack.push(transformMatrix)
    break
  case 3:
    transformMatrix = Mat4.rotateZ(x)
    matrixStack.push(transformMatrix)
    break
  case 4:
    transformMatrix = Mat4.scale(x, x, 1)
    matrixStack.push(transformMatrix)
    break
  }
}

var matrixStack = []

function multiplyThemAll(matrixStack, vec4) {
  this.nVec4 = vec4
  this.matrixStack = matrixStack
}

multiplyThemAll.prototype.exec = function () {
  //console.log(this.matrixStack.length)
  if (this.matrixStack.length) {
    var matrix = this.matrixStack.shift()
      //console.log(this.matrixStack.length)
    this.nVec4 = operate.multiply(matrix, this.nVec4)
      //console.log(this.nVec4)
    this.exec()
      //console.log('o')
  } else {
    console.log(this.nVec4)
    return this.nVec4
  }
}

STAGE = 0
switchMatrix()

var i = 0
var ddd = new multiplyThemAll(matrixStack, pts[edges[i][0]])

// var O1 = Vec4(ddd.exec())
//var O1 = ddd.exec()
//console.log(O1)

// matrixStack.forEach(function(item){
//   document.getElementById('info').innerHTML += (item[0]+' '+item)
// })
//
//  transformMatrix = Mat4.translate(x, y, 0)

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  var time = Date.now() * 0.001
  var x = Math.cos(time) / 2
  var y = Math.sin(time) / 2
  switchMatrix(time, x, y)

  var rotateXM = Mat4.rotateX(x)

  var rotateYM = Mat4.rotateY(y)

  var rotateZM = Mat4.rotateZ(x)

  var scaleM = Mat4.scale(x, x, 1)

  var eyeMatrix = Mat4.translate(0, 0, DISTANCE_FROM_CAMERA_TO_ZERO)
  var projectionMatrix = Mat4.perspective(FOV, ASPECT, NEAR, FAR)
    //var mat4 = Mat4()
    //console.log(mat4[4])
    //console.log(rotateXM)
    // mat4 = operate.multiply(mat4, rotateXM)
    // mat4 = operate.multiply(mat4, rotateYM)
    // mat4 = operate.multiply(mat4, rotateZM)
    // mat4 = operate.multiply(mat4, scaleM)
    //console.log(mat4)

  // for (var i = 0; i < edges.length; i++) {

  //   var p0 = operate.multiply(Mat4.inverse(eyeMatrix), operate.multiply(mat4, pts[edges[i][0]]))
  //   var p1 = operate.multiply(Mat4.inverse(eyeMatrix), operate.multiply(mat4, pts[edges[i][1]]))
  //     //console.log(matrixStack)
  //     //var O1 = new multiplyThemAll(matrixStack, pts[edges[i][0]]).exec()
  //     //var O2 = multiplyThemAll(matrixStack, pts[edges[i][1]])
  //     //console.log(O1)

  //   // var E1 = operate.multiply(Mat4.inverse(eyeMatrix), O1)
  //   // var E2 = operate.multiply(Mat4.inverse(eyeMatrix), O2)
  //   //console.log(p0)
  //   var a = depthPerspective(p0)
  //   var b = depthPerspective(p1)
  //     // var a = depthPerspective(E1)
  //     // var b = depthPerspective(E2)
  //     //
  //     // console.log(p0)
  //     // var a = operate.multiply(projectionMatrix, p0)
  //     // var b = operate.multiply(projectionMatrix, p1)
  //     // var a = [],
  //     //   b = []

  //   // a[0] = p0[0] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
  //   // a[1] = p0[1] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
  //   // a[2] = DISTANCE_FROM_CAMERA_TO_CANVAS - DISTANCE_FROM_CAMERA_TO_ZERO
  //   // b[0] = p1[0] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
  //   // b[1] = p1[1] * DISTANCE_FROM_CAMERA_TO_CANVAS / (p0[2] + DISTANCE_FROM_CAMERA_TO_ZERO)
  //   // b[2] = DISTANCE_FROM_CAMERA_TO_CANVAS - DISTANCE_FROM_CAMERA_TO_ZERO
  //   // console.log(a)

  //   // var a = p0
  //   // var b = p1
  //   // context.beginPath()
  //   // context.moveTo(viewport(a)[0], viewport(a)[1])
  //   // context.lineTo(viewport(b)[0], viewport(b)[1])
  //   // context.stroke()

  //   context.beginPath();
  //   var val = Math.floor(128 + 127 * Math.cos(time + i / 10 + i / 10));
  //   context.strokeStyle = 'rgb(50,200,' + val.toString() + ')';

  //   // context.strokeStyle = "rgb(" + (i * 10).toString() + "," + (i * 10).toString() + "," + (i * 10).toString()
  //   // ")";
  //   //context.strokeStyle = 'red'
  //   context.moveTo(w / 2 + w / 4 * a[0], h / 2 - w / 4 * a[1]);
  //   context.lineTo(w / 2 + w / 4 * b[0], h / 2 - w / 4 * b[1]);
  //   context.stroke();
  // }

  var time = Date.now() * 0.001
  var x = Math.cos(time) / 2
  var y = Math.sin(time) / 2

  //var mat4 = Mat4()
  //console.log(mat4[4])
  //console.log(rotateXM)
  var rotateXM = Mat4.rotateX(y)

  var rotateYM = Mat4.rotateY(x)

  var rotateZM = Mat4.rotateZ(y)

  // var scaleM = Mat4.scale(x, x, 1)
  // mat4 = operate.multiply(mat4, rotateXM)
  // mat4 = operate.multiply(mat4, rotateYM)
  // mat4 = operate.multiply(mat4, rotateZM)
  // mat4 = operate.multiply(mat4, scaleM)

  //console.log(oo[0])
  // for (var j = 0; j < ood.length; j++) {

  //   var p0 = operate.multiply(Mat4.inverse(eyeMatrix), operate.multiply(mat4, oo[ood[j][0]]))
  //   var p1 = operate.multiply(Mat4.inverse(eyeMatrix), operate.multiply(mat4, oo[ood[j][1]]))
  //     // var p0 = operate.multiply(Mat4.inverse(eyeMatrix), oo[ood[i][0]])
  //     // var p1 = operate.multiply(Mat4.inverse(eyeMatrix), oo[ood[i][1]])
  //     //console.log(p0)
  //   var a = depthPerspective(p0)
  //   var b = depthPerspective(p1)

  //   context.beginPath();
  //   //context.fillText(i, w / 2 + w / 4 * a[0], h / 2 - w / 4 * a[1])
  //   var val = Math.floor(128 + 127 * Math.cos(time + j / 10 + j / 10));
  //   context.strokeStyle = 'rgb(50,' + val.toString() + ',' + val.toString() + ')';
  //   context.moveTo(w / 2 + w / 4 * a[0], h / 2 - w / 4 * a[1]);
  //   context.lineTo(w / 2 + w / 4 * b[0], h / 2 - w / 4 * b[1]);
  //   context.stroke();
  // }

  mat4 = Mat4()
  mat4 = operate.multiply(mat4, Mat4.rotateZ(Math.cos(time)))
  mat4 = operate.multiply(mat4, Mat4.translate(0, -.5, 0))

  elbow = Mat4.transform(mat4, shoulder)
    //console.log(elbow)
  drawLineBetweenTwoVec(shoulder, elbow)
  mat4 = operate.multiply(mat4, Mat4.rotateZ(Math.cos(time * 0.01)))
  mat4 = operate.multiply(mat4, Mat4.translate(0, -.001, 0))
  fingerTip = Mat4.transform(mat4, elbow)
  drawLineBetweenTwoVec(elbow, fingerTip)

}

function drawLineBetweenTwoVec(v1, v2) {
  var a = depthPerspective(v1)
  var b = depthPerspective(v2)
  context.beginPath()
  context.moveTo(w / 2 + w / 4 * a[0], h / 2 - w / 4 * a[1]);
  context.lineTo(w / 2 + w / 4 * b[0], h / 2 - w / 4 * b[1]);
  context.stroke();

}

function viewport(p) {
  var out = [];
  out[0] = (w / 2) + p[0] / p[2] * (w / 2)
  out[1] = (h / 2) - p[1] / p[2] * (w / 2)
  return out
}

function viewport2d(p) {
  var out = [];
  out[0] = (w / 2) + p[0] * (w / 2)
  out[1] = (h / 2) - p[1] * (w / 2)
  return out
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

init()
animate()
},{"./mat4.js":"/Users/karen/Documents/my_project/matrix/functional/mat4.js","./operate.js":"/Users/karen/Documents/my_project/matrix/functional/operate.js","./vec4.js":"/Users/karen/Documents/my_project/matrix/functional/vec4.js"}],"/Users/karen/Documents/my_project/matrix/functional/mat4.js":[function(require,module,exports){
module.exports = Mat4;

var Vec4 = require('./vec4.js')

function Mat4(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
  return new Float32Array([
    a00 || 1, a01 || 0, a02 || 0, a03 || 0,
    a10 || 0, a11 || 1, a12 || 0, a13 || 0,
    a20 || 0, a21 || 0, a22 || 1, a23 || 0,
    a30 || 0, a31 || 0, a32 || 0, a33 || 1
  ])
}

Mat4.identity = function () {
  return Mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  )
}

Mat4.translate = function (x, y, z) {
  return Mat4(
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  )
}

Mat4.scale = function (x, y, z) {
  return Mat4(
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  )
}

Mat4.rotateX = function (theta) {
  return Mat4(
    1, 0, 0, 0,
    0, Math.cos(theta), Math.sin(theta), 0,
    0, -Math.sin(theta), Math.cos(theta), 0,
    0, 0, 0, 1
  )
}

Mat4.rotateY = function (theta) {
  return Mat4(
    Math.cos(theta), 0, -Math.sin(theta), 0,
    0, 1, 0, 0,
    Math.sin(theta), 0, Math.cos(theta), 0,
    0, 0, 0, 1
  )
}

Mat4.rotateZ = function (theta) {
  return Mat4(
    Math.cos(theta), Math.sin(theta), 0, 0, -Math.sin(theta), Math.cos(theta), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  )
}

Mat4.transform = function (src, dst) {
  //haha this one is tricky:)

}

Mat4.inverse = function (m) {
  var out = Mat4(
    m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10], -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10],
    m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6], -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6],

    -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10],
    m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10], -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6],
    m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6],

    m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9], -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9],
    m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5], -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5],

    -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9],
    m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9], -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5],
    m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5]
  )

  var det = m[0] * out[0] + m[1] * out[4] + m[2] * out[8] + m[3] * out[12]
  for (var i = 0; i < 16; i++) out[i] /= det
  return out

}

// Mat4.perspective = function (fov, aspect, near, far) {
//   var f = 1 / Math.tan(fov / 2),
//     nf = 1 / (near - far)
//   var out = Mat4(
//     f / aspect, 0, 0, 0,
//     0, f, 0, 0,
//     0, 0, (far + near) * nf, -1,
//     0, 0, (2 * far * near) * nf, 0
//   )
//   return out
// }

Mat4.perspective = function (fov, aspect, near, far) {
  var y = Math.tan(fov * Math.PI / 360) * near;
  var x = y * aspect;
  return Mat4.frustum(-x, x, -y, y, near, far);
};

// ### GL.Matrix.frustum(left, right, bottom, top, near, far[, result])
//
// Sets up a viewing frustum, which is shaped like a truncated pyramid with the
// camera where the point of the pyramid would be. You can optionally pass an
// existing matrix in `result` to avoid allocating a new matrix. This emulates
// the OpenGL function `glFrustum()`.
Mat4.frustum = function (l, r, b, t, n, f) {
  return Mat4(
    2 * n / (r - l), 0, (r + l) / (r - l), 0,
    0, 2 * n / (t - b), (t + b) / (t - b), 0,
    0, 0, -(f + n) / (f - n), -2 * f * n / (f - n),
    0, 0, -1, 0
  )

}

var dot = require('./operate.js').dot
var multiply = require('./operate.js').multiply

Mat4.transform = function (mat, src) {
  //var out = Vec4
  var dst = multiply(mat, src)
  return dst
}
},{"./operate.js":"/Users/karen/Documents/my_project/matrix/functional/operate.js","./vec4.js":"/Users/karen/Documents/my_project/matrix/functional/vec4.js"}],"/Users/karen/Documents/my_project/matrix/functional/operate.js":[function(require,module,exports){
var Vec4 = require('./vec4.js')
var Mat4 = require('./mat4.js')

module.exports.multiply = multiply
module.exports.dot = dot

function multiply(mat4, something) {
  //console.log(something)
  if (something[4] !== undefined) {
    //something is a matrix
    //console.log('!')
    var aMat4 = mat4;
    var bMat4 = something;
    var out = Mat4(
      dot(Vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), Vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
      dot(Vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), Vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
      dot(Vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), Vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
      dot(Vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), Vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15])),

      dot(Vec4(aMat4[4], aMat4[5], aMat4[6], aMat4[7]), Vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
      dot(Vec4(aMat4[4], aMat4[5], aMat4[6], aMat4[7]), Vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
      dot(Vec4(aMat4[4], aMat4[5], aMat4[6], aMat4[7]), Vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
      dot(Vec4(aMat4[4], aMat4[5], aMat4[7], aMat4[7]), Vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15])),

      dot(Vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), Vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
      dot(Vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), Vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
      dot(Vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), Vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
      dot(Vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), Vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15])),

      dot(Vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), Vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
      dot(Vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), Vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
      dot(Vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), Vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
      dot(Vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), Vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15]))
    )
    return out;

  } else {
    //something is a vec4
    var vec4 = something;
    //console.log(mat4)
    var out = Vec4(
        dot(Vec4(mat4[0], mat4[1], mat4[2], mat4[3]), vec4),
        dot(Vec4(mat4[4], mat4[5], mat4[6], mat4[7]), vec4),
        dot(Vec4(mat4[8], mat4[9], mat4[10], mat4[11]), vec4),
        dot(Vec4(mat4[12], mat4[13], mat4[14], mat4[15]), vec4)
      )
      //console.log(out)
    return out

  }

}

function dot(aVec4, something) {
  if (something[3] !== undefined) {
    //something is a vec4
    var bVec4 = something
    return aVec4[0] * bVec4[0] + aVec4[1] * bVec4[1] + aVec4[2] * bVec4[2] + aVec4[3] * bVec4[3]

  } else {
    //something is a value
    return aVec4[0] * something + aVec4[1] * something + aVec4[2] * something + aVec4[3] * something
  }
}
},{"./mat4.js":"/Users/karen/Documents/my_project/matrix/functional/mat4.js","./vec4.js":"/Users/karen/Documents/my_project/matrix/functional/vec4.js"}],"/Users/karen/Documents/my_project/matrix/functional/vec4.js":[function(require,module,exports){
module.exports = Vec4

function Vec4(x, y, z, w) {
  return new Float32Array([x || 0, y || 0, z || 0, w || 1])
}
},{}]},{},["/Users/karen/Documents/my_project/matrix/functional/main.js"]);
