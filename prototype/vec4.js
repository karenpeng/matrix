module.exports = Vec4

function Vec4(x, y, z, w) {
  this.element = new Float32Array([x || 0, y || 0, z || 0, w || 0])
}

Vec4.prototype.dot = function (something) {
  if (something instanceof Vec4) {
    //something is a vec4
    var bVec4 = something
    return this.element[0] * bVec4.element[0] + this.element[1] * bVec4.element[1] + this.element[2] * bVec4.element[2] + this.element[3] * bVec4.element[3]

  } else {
    //something is a value
    return this.element[0] * something + this.element[1] * something + this.element[2] * something + this.element[3] * something
  }
}