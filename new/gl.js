var gl = function () {
		this.stack = [];
}

gl.pushMatrix = function () {

}

gl.multiplyMatrix = function (m) {
		Mat4.multiply(someMatrix, m, new Mat4());
}

gl.translate = function (x, y, z) {
		gl.multiplyMatrix(Mat4.translate(x, y, z));
}