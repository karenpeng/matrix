var Matrix = require('./mat4.js')
var Vector = require('./vec4.js')

var gl = {}

function addMatrixStack() {
  gl.MODELVIEW = ENUM | 1;
  gl.PROJECTION = ENUM | 2;
  var tempMatrix = new Matrix();
  var resultMatrix = new Matrix();
  gl.modelviewMatrix = new Matrix();
  gl.projectionMatrix = new Matrix();
  var modelviewStack = [];
  var projectionStack = [];
  var matrix, stack;
  gl.matrixMode = function (mode) {
    switch (mode) {
    case gl.MODELVIEW:
      matrix = 'modelviewMatrix';
      stack = modelviewStack;
      break;
    case gl.PROJECTION:
      matrix = 'projectionMatrix';
      stack = projectionStack;
      break;
    default:
      throw new Error('invalid matrix mode ' + mode);
    }
  };
}
gl.loadIdentity = function () {
  Matrix.identity(gl[matrix]);
};
gl.loadMatrix = function (m) {
  var from = m.m,
    to = gl[matrix].m;
  for (var i = 0; i < 16; i++) {
    to[i] = from[i];
  }
};
gl.multMatrix = function (m) {
  gl.loadMatrix(Matrix.multiply(gl[matrix], m, resultMatrix));
};
gl.perspective = function (fov, aspect, near, far) {
  gl.multMatrix(Matrix.perspective(fov, aspect, near, far, tempMatrix));
};
gl.frustum = function (l, r, b, t, n, f) {
  gl.multMatrix(Matrix.frustum(l, r, b, t, n, f, tempMatrix));
};
gl.ortho = function (l, r, b, t, n, f) {
  gl.multMatrix(Matrix.ortho(l, r, b, t, n, f, tempMatrix));
};
gl.scale = function (x, y, z) {
  gl.multMatrix(Matrix.scale(x, y, z, tempMatrix));
};
gl.translate = function (x, y, z) {
  gl.multMatrix(Matrix.translate(x, y, z, tempMatrix));
};
gl.rotate = function (a, x, y, z) {
  gl.multMatrix(Matrix.rotate(a, x, y, z, tempMatrix));
};
gl.lookAt = function (ex, ey, ez, cx, cy, cz, ux, uy, uz) {
  gl.multMatrix(Matrix.lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz, tempMatrix));
};
gl.pushMatrix = function () {
  stack.push(Array.prototype.slice.call(gl[matrix].m));
};
gl.popMatrix = function () {
  var m = stack.pop();
  gl[matrix].m = hasFloat32Array ? new Float32Array(m) : m;
};
gl.project = function (objX, objY, objZ, modelview, projection, viewport) {
  modelview = modelview || gl.modelviewMatrix;
  projection = projection || gl.projectionMatrix;
  viewport = viewport || gl.getParameter(gl.VIEWPORT);
  var point = projection.transformPoint(modelview.transformPoint(new Vector(objX, objY, objZ)));
  return new Vector(
    viewport[0] + viewport[2] * (point.x * 0.5 + 0.5),
    viewport[1] + viewport[3] * (point.y * 0.5 + 0.5),
    point.z * 0.5 + 0.5
  );
};
gl.unProject = function (winX, winY, winZ, modelview, projection, viewport) {
  modelview = modelview || gl.modelviewMatrix;
  projection = projection || gl.projectionMatrix;
  viewport = viewport || gl.getParameter(gl.VIEWPORT);
  var point = new Vector(
    (winX - viewport[0]) / viewport[2] * 2 - 1, (winY - viewport[1]) / viewport[3] * 2 - 1,
    winZ * 2 - 1
  );
  return Matrix.inverse(Matrix.multiply(projection, modelview, tempMatrix), resultMatrix).transformPoint(point);
};

module.exports = gl;