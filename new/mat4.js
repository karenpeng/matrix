'use strict';

//var Vector = module.exportsvar dot = require('./operator.js').dot
//var multiply = require('./operator.js').multiply

function Mat4(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
  if (!(this instanceof Mat4)) {
    return new Mat4(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33);
  }
  this.m = new Float32Array([
    a00 || 1, a01 || 0, a02 || 0, a03 || 0,
    a10 || 0, a11 || 1, a12 || 0, a13 || 0,
    a20 || 0, a21 || 0, a22 || 1, a23 || 0,
    a30 || 0, a31 || 0, a32 || 0, a33 || 1
  ]);
  return this;
}

Mat4.translate = function (x, y, z, result) {
  result = result || Mat4();
  result.m = new Float32Array([
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  ]);
  return result;
}

Mat4.scale = function (x, y, z, result) {
  result = result || Mat4();
  result.m = new Float32Array([
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  ]);
  return result;
}

Mat4.rotateX = function (theta, result) {
  result = result || Mat4();
  result.m = new Float32Array([
    1, 0, 0, 0,
    0, Math.cos(theta), Math.sin(theta), 0,
    0, -Math.sin(theta), Math.cos(theta), 0,
    0, 0, 0, 1
  ]);
  return result;
}

Mat4.rotateY = function (theta, result) {
  result = result || Mat4();
  result.m = new Float32Array([
    Math.cos(theta), 0, -Math.sin(theta), 0,
    0, 1, 0, 0,
    Math.sin(theta), 0, Math.cos(theta), 0,
    0, 0, 0, 1
  ]);
  return result;
}

Mat4.rotateZ = function (theta, result) {
  result = result || Mat4();
  result.m = new Float32Array([
    Math.cos(theta), Math.sin(theta), 0, 0, -Math.sin(theta), Math.cos(theta), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  return result;
}

Mat4.identity = function (result) {
  result = result || Mat4();
  result.m = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  return result;
}

/**
 * [transformVec4 description]
 * @param  {[type]} matrix [description]
 * @param  {[type]} src    [description]
 * @param  {[type]} dst    [description]
 * @return {[type]}        [description]
 */
Mat4.transformPoint = function (matrix, src, dst) {
  var m = matrix.m;
  dst[0] = m[0] * src[0] + m[1] * src[1] + m[2] * src[2] + m[3];
  dst[1] = m[4] * src[0] + m[5] * src[1] + m[6] * src[2] + m[7];
  dst[0] = m[8] * src[0] + m[9] * src[1] + m[10] * src[2] + m[11];
  dst[0] = m[12] * src[0] + m[13] * src[1] + m[14] * src[2] + m[15];
  return dst;

}

Mat4.prototype = {

  multiply: function (mat) {
    return Mat4.multiply(this, mat, new Mat4())
  },

  inverse: function () {
    return Mat4.inverse(this, new Mat4())
  },

  transformVec3: function (src, dst) {
    return Mat4.transformVec3(this, src, dst)
  }

}

Mat4.transformVec3 = function (matrix, src, dst) {
  var m = matrix.m;
  // var w = dot([m[3], m[7], m[11]], src) + 1;
  // dst.x = (dot([m[0], m[4], m[8]], src) + m[12]) / w;
  // dst.y = (dot([m[1], m[5], m[9]], src) + m[13]) / w;
  // dst.z = (dot([m[2], m[6], m[10]], src) + m[14]) / w;
  //dst.x =
  return dst;
}

/**
 * [multiply description]
 * @param  {[type]} left   [description]
 * @param  {[type]} right  [description]
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
Mat4.multiply = function (left, right, result) {
  result = result || new Mat4();
  var a = left.m,
    b = right.m,
    r = result.m;
  // console.log(a)
  // console.log(b)

  r[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
  r[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
  r[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
  r[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

  r[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
  r[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
  r[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
  r[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

  r[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
  r[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
  r[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
  r[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

  r[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
  r[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
  r[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
  r[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

  return result;
}

Mat4.inverse = function (matrix, result) {
  result = result || new Mat4();
  var m = matrix.m,
    r = result.m;

  r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
  r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
  r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
  r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];

  r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
  r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
  r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
  r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];

  r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
  r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
  r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
  r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];

  r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
  r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
  r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
  r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];

  var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
  for (var i = 0; i < 16; i++) r[i] /= det;
  return result;
};

// Mat4.perspective = function (r, l, t, b, f, n, result) {
//   result = result || new Mat4();
//   var m = result.m;
//   m = [2 * n / (r - l), 0, 0, 0,
//     0, 2 * n / (t - b), 0, 0, (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1,
//     0, 0, -2 * f * n / (f - n), 0
//   ];
//   console.log(result.m)
//   return result;
// };
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

Mat4.lookAt = function (ex, ey, ez, cx, cy, cz, ux, uy, uz, result) {
  result = result || new Mat4();
  var m = result.m;

  var e = new Vec3(ex, ey, ez);
  var c = new Vec3(cx, cy, cz);
  var u = new Vec3(ux, uy, uz);
  var f = e.subtract(c).unit();
  var s = u.cross(f).unit();
  var t = f.cross(s).unit();

  m[0] = s.x;
  m[1] = s.y;
  m[2] = s.z;
  m[3] = -s.dot(e);

  m[4] = t.x;
  m[5] = t.y;
  m[6] = t.z;
  m[7] = -t.dot(e);

  m[8] = f.x;
  m[9] = f.y;
  m[10] = f.z;
  m[11] = -f.dot(e);

  m[12] = 0;
  m[13] = 0;
  m[14] = 0;
  m[15] = 1;

  return result;
};

function dot(v1, v2) {
  if (v1.x !== undefined) v1 = [v1.x, v1.y, v1.z];
  if (v2.x !== undefined) v2 = [v2.x, v2.y, v2.z];
  var sum = 0.0;
  for (var i = 0; i < v1.length; i++) {
    sum += v1[i] * v2[i];
  }
  return sum;
}