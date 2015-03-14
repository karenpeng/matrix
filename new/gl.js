var gl = function (id) {
  if (!(this instanceof gl)) {
    return new gl();
  }
  this.stack = [];
  this.currentMatrix = Mat4();
  this.beginIndex = 0;
  this.endIndex = 0;
  // this.projectionMatrixStack = [];
  // this.modelViewMatrixStack = [];
  // let's first assume that the eye is in 0,0,0,1
  // this.eyeMatrix = Mat4();
  this.projectionMatrix = Mat4();
  this.canvas = document.getElementById(id);
  this.context = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
}

gl.prototype.pushMatrix = function (m) {
  this.stack.push(m);
}

gl.prototype.popMatrix = function () {
  this.stack.pop();
}

gl.prototype.multiplyMatrix = function (m) {
  this.stack.push(m);
  // for(var i = beginIndex; i<endIndex ; i++){
  //   var matrix = this.stack[i];
  //   this.currentMatrix = Mat4.multiply(matrix, this.currentMatrix, new Mat4());
  // }
  this.currentMatrix = Mat4.identity();
  for (var i = 0; i < this.stack.length; i++) {
    var matrix = this.stack[i];
    this.currentMatrix = Mat4.multiply(this.currentMatrix, matrix, new Mat4());
  }
}

// gl.prototype.camera = function (r, l, t, b, f, n) {
//   this.projectionMatrix = Mat4.perspective(r, l, t, b, f, n);
//   console.log(this.projectionMatrix.m)
// }
gl.prototype.camera = function (fov, aspect, near, far) {
  this.projectionMatrix = Mat4.perspective(fov, aspect, near, far);
  //console.log(this.projectionMatrix.m)
}

gl.prototype.drawPoint = function (point, color) {
  var matrix = new Mat4()
  console.log(this.currentMatrix.m)

  var point3D = Mat4.transformVec3(this.currentMatrix, point, new Vec3());
  console.log(point3D)
    //matrix = Mat4.multiply(this.projectionMatrix, this.currentMatrix);
    //console.log(this.projectionMatrix.m)
  var point3D = Mat4.transformVec3(this.projectionMatrix, point3D, new Vec3())
  console.log(point3D)
  var point2D = this.viewport(point3D);
  //console.log(point2D)
  this.context.fillStyle = color;
  this.context.fillRect(point2D[0], point2D[1], 10, 10);
}

gl.prototype.viewport = function (vec3) {
  var px = (this.width / 2) + vec3.x * (this.width / 2);
  var py = (this.height / 2) - vec3.y * (this.width / 2);
  return [px, py];
}

gl.prototype.translate = function (x, y, z) {
  this.multiplyMatrix(Mat4.translate(x, y, z));
}

gl.scale = function (x, y, z) {
  gl.multiplyMatrix(Mat4.scale(x, y, z));
}

gl.rotateX = function (theta) {
  gl.multiplyMatrix(Mat4.rotateX(theta));
}

gl.rotateY = function (theta) {
  gl.multiplyMatrix(Mat4.rotateY(theta));
}

gl.rotateZ = function (theta) {
  gl.multiplyMatrix(Mat4.rotateZ(theta));
}