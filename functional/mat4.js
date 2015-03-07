module.exports = Matrix4;

function Matrix4(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
  return new Float32Array([
    a00 || 1, a01 || 0, a02 || 0, a03 || 0,
    a10 || 0, a11 || 1, a12 || 0, a13 || 0,
    a20 || 0, a21 || 0, a22 || 1, a23 || 0,
    a30 || 0, a31 || 0, a32 || 0, a33 || 1
  ])
}

var m = Matrix4();
m = Matrix4.multiple.Matrix4.translate(x, y, z);
translate(m, x, y, z);

// Matrix4.identity = function () {
//   return new Float32Array([
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
//   ])
// }

Matrix4.translate = function (mat4, x, y, z) {
  var translateMatrix = new Float32Array([
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  ])
  var out = Matrix4.multiple(mat4, translateMatrix)
  return out
}

Matrix4.scale = function (mat4, x, y, z) {
  var scaleMatrix = new Float32Array([
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  ])
  var out = Matrix4.multiple(mat4, scaleMatrix)
  return out
}

Matrix4.rotateX = function (mat4, theta) {
  var rotateXMatrix = new Float32Array([
    1, 0, 0, 0,
    0, Math.cos(theta), Math.sin(theta), 0,
    0, Math.sin(theta), Math.cos(theta), 0
    0, 0, 0, 1
  ])
  var out = Matrix4.multiple(mat4, rotateXMatrix)
  return out
}

Matrix4.rotateY = function (mat4, theta) {
  var rotateYMatrix = new Float32Array([
    Math.cos(theta), 0, Math.cos(theta), 0,
    0, 1, 0, 0,
    Math.sin(theta), 0, Math.sin(theta), 0,
    0, 0, 0, 1
  ])
  var out = Matrix4.multiple(mat4, rotateYMatrix)
}

Matrix4.rotateZ = function (theta) {
  var rotateZMatrix = new Float32Array([
    Math.cos(theta), Math.sin(theta), 0, 0,
    Math.sin(theta), Math.cos(thesta) 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ])
  var out = Matrix4.multiple(mat4, rotateZMatrix)
}

Matrix4.transform = function (src, dst) {
  //haha this one is tricky:)

}

Matrix4.multiple = function (aMat4, bMat4) {
  var out = Matrix4(
    Vec4.dot(vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
    Vec4.dot(vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
    Vec4.dot(vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
    Vec4.dot(vec4(aMat4[0], aMat4[1], aMat4[2], aMat4[3]), vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15])),

    Vec4.dot(vec4(aMat4[4], aMat4[5], aMat4[6], aMat4[7]), vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
    Vec4.dot(vec4(aMat4[4], aMat4[5], aMat4[6], aMat4[7]), vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
    Vec4.dot(vec4(aMat4[4], aMat4[5], aMat4[6], aMat4[7]), vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
    Vec4.dot(vec4(aMat4[4], aMat4[5], aMat4[7], aMat4[7]), vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15])),

    Vec4.dot(vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
    Vec4.dot(vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
    Vec4.dot(vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
    Vec4.dot(vec4(aMat4[8], aMat4[9], aMat4[10], aMat4[11]), vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15])),

    Vec4.dot(vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), vec4(bMat4[0], bMat4[4], bMat4[8], bMat4[12])),
    Vec4.dot(vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), vec4(bMat4[1], bMat4[5], bMat4[9], bMat4[13])),
    Vec4.dot(vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), vec4(bMat4[2], bMat4[6], bMat4[10], bMat4[14])),
    Vec4.dot(vec4(aMat4[12], aMat4[13], aMat4[14], aMat4[15]), vec4(bMat4[3], bMat4[7], bMat4[11], bMat4[15]))
  )
  return out;
}

//so how do you call it?
//p5: rotateX(theta){
//  oldMatrix.multiple(roateXMatrix(theta))
//  return oldMatrix
//}