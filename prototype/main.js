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