m = Mat4()
m.translate(.1, 0, 0).rotateX(theta)
draw(x, t)
m.rotate(thetea)

//in processing:
//matrix is hidden
void setup() {
  size(200, 200);
  pushMatrix();

  pushMatrix();
  translate(80, 0);
  //rotate(PI/2);

  fill(233, 3, 3);
  rect(0, 0, 10, 10);

  //popMatrix();

  translate(80, 0);
  //rotate(PI/4);

  fill(6, 223, 3);
  rect(0, 0, 10, 10);
  popMatrix();

  popMatrix();

  pushMatrix();
  translate(80, 0);
  //rotate(PI/3);
  fill(3, 3, 200);
  rect(0, 0, 10, 10);
  popMatrix();

}

//ken's code:
//mulriply is hidden
m.identity();
m.scale(.5);
m.translate(-.7, 0, 0);
m.rotateY(Math.PI / 2 + turnAngle);
m.translate(0, .5 + .1 * bend2, .1 * sign);

moveTo([0, 0, 0]); // HIP

m.rotateZ(bend1);
m.translate(0, -.5, 0);
lineTo([0, 0, 0]); // KNEE

m.rotateZ(-2 * bend2);
m.translate(0, -.5, 0);
lineTo([0, 0, 0]); // ANKLE

m.rotateZ(-bend1);
m.translate(.2, 0, 0);
lineTo([0, 0, 0]); // TOE

//another way too:
gl.multMatrix = function (m) {
  gl.loadMatrix(Matrix.multiply(gl[matrix], m, resultMatrix));
};
gl.scale = function (x, y, z) {
  gl.multMatrix(Matrix.scale(x, y, z, tempMatrix));
};
gl.translate = function (x, y, z) {
  gl.multMatrix(Matrix.translate(x, y, z, tempMatrix));
};