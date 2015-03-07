(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  "/Users/karen/Documents/my_project/matrix/prototype/main.js": [function (require, module, exports) {
    var Vec4 = require('./vec4.js')
    var Mat4 = require('./mat4.js')

    var pts = [
      new Vec4(-1, -1, -1, 1),
      new Vec4(1, -1, -1, 1),
      new Vec4(-1, 1, -1, 1),
      new Vec4(1, 1, -1, 1),
      new Vec4(-1, -1, 1, 1),
      new Vec4(1, -1, 1, 1),
      new Vec4(-1, 1, 1, 1),
      new Vec4(1, 1, 1, 1)
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

    var w, h, canvas, context

    function init() {
      canvas = document.getElementById('canvas1')
      w = canvas.width
      h = canvas.height
      context = canvas.getContext('2d')
    }

    function depthPerspective(p) {
      var focalLength = 8.0
      var pz = focalLength / (focalLength - p[2])
      return [p[0] * pz, p[1] * pz, pz]
    }

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      var time = Date.now() * 0.001
      var x = Math.cos(time) / 2
      var y = Math.sin(time) / 2
      var matrix = new Mat4()
      matrix.translate(x, y, 0)

      for (var i = 0; i < edges.length; i++) {

        var p0 = matrix.multiply(pts[edges[i][0]])
        var p1 = matrix.multiply(pts[edges[i][1]])

        var a = depthPerspective(p0.element)
        var b = depthPerspective(p1.element)

        context.beginPath()
        context.moveTo(w / 2 + w / 4 * a[0], h / 2 - w / 4 * a[1])
        context.lineTo(w / 2 + w / 4 * b[0], h / 2 - w / 4 * b[1])
        context.stroke()
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      render()
    }

    init()
    animate()
  }, {
    "./mat4.js": "/Users/karen/Documents/my_project/matrix/prototype/mat4.js",
    "./vec4.js": "/Users/karen/Documents/my_project/matrix/prototype/vec4.js"
  }],
  "/Users/karen/Documents/my_project/matrix/prototype/mat4.js": [function (require, module, exports) {
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
  }, {
    "./vec4.js": "/Users/karen/Documents/my_project/matrix/prototype/vec4.js"
  }],
  "/Users/karen/Documents/my_project/matrix/prototype/vec4.js": [function (require, module, exports) {
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
  }, {}]
}, {}, ["/Users/karen/Documents/my_project/matrix/prototype/main.js"]);