// m = Mat4()
// m.translate(.1, 0, 0).rotateX(theta)
// draw(x, t)
// m.rotate(thetea)

// //in processing:
// //matrix is hidden
// void setup() {
//   size(200, 200);
//   pushMatrix();

//     translate(20,0);

//     pushMatrix();
//       translate(80, 0);
//       //rotate(PI/2);

//       fill(233, 3, 3);
//       rect(0, 0, 10, 10);

//       //popMatrix();

//       translate(80, 0);
//       //rotate(PI/4);

//       fill(6, 223, 3);
//       rect(0, 0, 10, 10);
//     popMatrix();

//   popMatrix();

//   pushMatrix();
//     translate(80, 0);
//     //rotate(PI/3);
//     fill(3, 3, 200);
//     rect(0, 0, 10, 10);
//   popMatrix();
// }

// //ken's code:
// //mulriply is hidden
// m.identity();
// m.scale(.5);
// m.translate(-.7, 0, 0);
// m.rotateY(Math.PI / 2 + turnAngle);
// m.translate(0, .5 + .1 * bend2, .1 * sign);

// moveTo([0, 0, 0]); // HIP

// m.rotateZ(bend1);
// m.translate(0, -.5, 0);
// lineTo([0, 0, 0]); // KNEE

// m.rotateZ(-2 * bend2);
// m.translate(0, -.5, 0);
// lineTo([0, 0, 0]); // ANKLE

// m.rotateZ(-bend1);
// m.translate(.2, 0, 0);
// lineTo([0, 0, 0]); // TOE

// //lightgl.js:
// //another way too:
// gl.multMatrix = function (m) {
//   gl.loadMatrix(Matrix.multiply(gl[matrix], m, resultMatrix));
// };
// gl.translate = function (x, y, z) {
//   gl.multMatrix(Matrix.translate(x, y, z, tempMatrix));
// };
// Matrix.translate = function(x, y, z, result) {
//   result = result || new Matrix();
//   var m = result.m;

//   m[0] = 1;
//   m[1] = 0;
//   m[2] = 0;
//   m[3] = x;

//   m[4] = 0;
//   m[5] = 1;
//   m[6] = 0;
//   m[7] = y;

//   m[8] = 0;
//   m[9] = 0;
//   m[10] = 1;
//   m[11] = z;

//   m[12] = 0;
//   m[13] = 0;
//   m[14] = 0;
//   m[15] = 1;

//   return result;
// };

// gl.loadIdentity();
// gl.translate(0, 0, -5);
// gl.rotate(30, 1, 0, 0);
// gl.rotate(angle, 0, 1, 0);

//var canvas = initCanvas('canvas1');
// var cube = new Shape(
//   [Vec3(-1, -1, -1),
//     Vec3(1, -1, -1),
//     Vec4(-1, 1, -1),
//     Vec4(1, 1, -1),
//     Vec4(-1, -1, 1),
//     Vec4(1, -1, 1),
//     Vec4(-1, 1, 1),
//     Vec4(1, 1, 1)
//   ],
//   // edges
//   [
//     [0, 1],
//     [0, 2],
//     [0, 4],
//     [1, 3],
//     [1, 5],
//     [2, 6],
//     [2, 3],
//     [3, 7],
//     [4, 5],
//     [4, 6],
//     [5, 7],
//     [6, 7]
//   ]
// )
var point = Vec3(-1, -1, -1);

FOV = 45

var can = document.getElementById('canvas1');
var w = can.width;
var h = can.height;
ASPECT = w / h
NEAR = 10
FAR = 220

// canvas.update = function (g) {
//   var GL = new gl();
//   gl.camera(FOV, ASPECT, NEAR, FAR);
//   gl.translate(0.2, 0, 0);
//   // gl.popMatrix();
//   // gl.popMatrix();
//   gl.drawPoint(point, 'red');
//   gl.translate(0, 0.2, 0);
//   gl.drawPoint(point, 'red');
// }

function doIt() {
  var GL = new gl('canvas1');
  // GL.camera(2, -2, 2, -2, 1, -1);
  GL.camera(FOV, ASPECT, NEAR, FAR);
  GL.translate(0.5, 0, 0);
  // gl.popMatrix();
  // gl.popMatrix();
  GL.drawPoint(point, 'red');
  GL.translate(0, 0.5, 0);
  GL.drawPoint(point, 'green');
}

doIt()