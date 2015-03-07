module.exports = Mat4

var Vec4 = require('./vec4.js')

function Mat4(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
  this.element = new Float32Array([
    a00 || 1, a01 || 0, a02 || 0, a03 || 0,
    a10 || 0, a11 || 1, a12 || 0, a13 || 0,
    a20 || 0, a21 || 0, a22 || 1, a23 || 0,
    a30 || 0, a31 || 0, a32 || 0, a33 || 1
  ])
}

Mat4.prototype = {

  translate: function (x, y, z) {
    this.element = new Float32Array([
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    ])
  },

  scale: function (x, y, z) {
    this.element = new Float32Array([
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    ])
  },

  rotateX: function (theta) {
    this.element = new Float32Array([
      1, 0, 0, 0,
      0, Math.cos(theta), Math.sin(theta), 0,
      0, Math.sin(theta), Math.cos(theta), 0,
      0, 0, 0, 1
    ])
  },

  rotateY: function (theta) {
    this.element = new Float32Array([
      Math.cos(theta), 0, Math.cos(theta), 0,
      0, 1, 0, 0,
      Math.sin(theta), 0, Math.sin(theta), 0,
      0, 0, 0, 1
    ])
  },

  rotateZ: function (theta) {
    this.element = new Float32Array([
      Math.cos(theta), Math.sin(theta), 0, 0,
      Math.sin(theta), Math.cos(thesta), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  },

  transform: function (src, dst) {
    //haha this one is tricky:)

  },

  multiply: function (something) {

    if (something instanceof Vec4) {

      return new Vec4(
        new Vec4(this.element[0], this.element[1], this.element[2], this.element[3]).dot(something),
        new Vec4(this.element[4], this.element[5], this.element[6], this.element[7]).dot(something),
        new Vec4(this.element[8], this.element[9], this.element[10], this.element[11]).dot(something),
        new Vec4(this.element[12], this.element[13], this.element[14], this.element[15]).dot(something)
      )

    } else if (something instanceof Mat4) {

      return new Mat4(

        new Vec4(this.element[0], this.element[1], this.element[2], this.element[3])
        .dot(new Vec4(something.element[0], something.element[4], something.element[8], something.element[12])),

        new Vec4(this.element[0], this.element[1], this.element[2], this.element[3])
        .dot(new Vec4(something.element[1], something.element[5], something.element[9], something.element[13])),

        new Vec4(this.element[0], this.element[1], this.element[2], this.element[3])
        .dot(new Vec4(something.element[2], something.element[6], something.element[10], something.element[14])),

        new Vec4(this.element[0], this.element[1], this.element[2], this.element[3])
        .dot(new Vec4(something.element[3], something.element[7], something.element[11], something.element[15])),

        new Vec4(this.element[4], this.element[5], this.element[6], this.element[7])
        .dot(new Vec4(something.element[0], something.element[4], something.element[8], something.element[12])),

        new Vec4(this.element[4], this.element[5], this.element[6], this.element[7])
        .dot(new Vec4(something.element[1], something.element[5], something.element[9], something.element[13])),

        new Vec4(this.element[4], this.element[5], this.element[6], this.element[7])
        .dot(new Vec4(something.element[2], something.element[6], something.element[10], something.element[14])),

        new Vec4(this.element[4], this.element[5], this.element[6], this.element[7])
        .dot(new Vec4(something.element[3], something.element[7], something.element[11], something.element[15])),

        new Vec4(this.element[8], this.element[9], this.element[10], this.element[11])
        .dot(new Vec4(something.element[0], something.element[4], something.element[8], something.element[12])),

        new Vec4(this.element[8], this.element[9], this.element[10], this.element[11])
        .dot(new Vec4(something.element[1], something.element[5], something.element[9], something.element[13])),

        new Vec4(this.element[8], this.element[9], this.element[10], this.element[11])
        .dot(new Vec4(something.element[2], something.element[6], something.element[10], something.element[14])),

        new Vec4(this.element[8], this.element[9], this.element[10], this.element[11])
        .dot(new Vec4(something.element[3], something.element[7], something.element[11], something.element[15])),

        new Vec4(this.element[12], this.element[13], this.element[14], this.element[15])
        .dot(new Vec4(something.element[0], something.element[4], something.element[8], something.element[12])),

        new Vec4(this.element[12], this.element[13], this.element[14], this.element[15])
        .dot(new Vec4(something.element[1], something.element[5], something.element[9], something.element[13])),

        new Vec4(this.element[12], this.element[13], this.element[14], this.element[15])
        .dot(new Vec4(something.element[2], something.element[6], something.element[10], something.element[14])),

        new Vec4(this.element[12], this.element[13], this.element[14], this.element[15])
        .dot(new Vec4(something.element[3], something.element[7], something.element[11], something.element[15]))
      )
    }
  }
}