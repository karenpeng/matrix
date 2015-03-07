function Vec4(x, y, z, w) {
  return new Float32Array([x || 0, y || 0, z || 0, w || 0])
}

Vec4.dot = function (aVec4, bVec4) {
  return aVec4[0] * bVec4[0] + aVec[1] * bVec[1] + aVec[2] * bVec[2] + aVec[3] * bVec[3]
}

Vec4.multiple = function (vec4, mat4) {
  var out = vec4(
    Vec4.dot(vec4, vec4(mat4[0], mat4[4], mat4[8], mat4[12])),
    Vec4.dot(vec4, vec4(mat4[1], mat4[5], mat4[9], mat4[13])),
    Vec4.dot(vec4, vec4(mat4[2], mat4[6], mat4[10], mat4[14])),
    Vec4.dot(vec4, vec4(mat4[3], mat4[7], mat4[11], mat4[15]))
  )
}