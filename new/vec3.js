function Vec3(x, y, z) {
  if (!(this instanceof Vec3)) {
    return new Vec3(x, y, z);
  }
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

// ### Instance Methods
// The methods `add()`, `subtract()`, `multiply()`, and `divide()` can all
// take either a vector or a number as an argument.
Vec3.prototype = {
  negative: function () {
    return new Vec3(-this.x, -this.y, -this.z);
  },
  add: function (v) {
    if (v instanceof Vec3) return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    else return new Vec3(this.x + v, this.y + v, this.z + v);
  },
  subtract: function (v) {
    if (v instanceof Vec3) return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    else return new Vec3(this.x - v, this.y - v, this.z - v);
  },
  multiply: function (v) {
    if (v instanceof Vec3) return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    else return new Vec3(this.x * v, this.y * v, this.z * v);
  },
  divide: function (v) {
    if (v instanceof Vec3) return new Vec3(this.x / v.x, this.y / v.y, this.z / v.z);
    else return new Vec3(this.x / v, this.y / v, this.z / v);
  },
  equals: function (v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  },
  dot: function (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  cross: function (v) {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  },
  length: function () {
    return Math.sqrt(this.dot(this));
  },
  unit: function () {
    return this.divide(this.length());
  },
  min: function () {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function () {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  toAngles: function () {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function (a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function (n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function () {
    return new Vec3(this.x, this.y, this.z);
  },
  init: function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
};

// ### Static Methods
// `Vec3.randomDirection()` returns a vector with a length of 1 and a
// statistically uniform direction. `Vec3.lerp()` performs linear
// interpolation between two vectors.
Vec3.negative = function (a, b) {
  b.x = -a.x;
  b.y = -a.y;
  b.z = -a.z;
  return b;
};
Vec3.add = function (a, b, c) {
  if (b instanceof Vec3) {
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    c.z = a.z + b.z;
  } else {
    c.x = a.x + b;
    c.y = a.y + b;
    c.z = a.z + b;
  }
  return c;
};
Vec3.subtract = function (a, b, c) {
  if (b instanceof Vec3) {
    c.x = a.x - b.x;
    c.y = a.y - b.y;
    c.z = a.z - b.z;
  } else {
    c.x = a.x - b;
    c.y = a.y - b;
    c.z = a.z - b;
  }
  return c;
};
Vec3.multiply = function (a, b, c) {
  if (b instanceof Vec3) {
    c.x = a.x * b.x;
    c.y = a.y * b.y;
    c.z = a.z * b.z;
  } else {
    c.x = a.x * b;
    c.y = a.y * b;
    c.z = a.z * b;
  }
  return c;
};
Vec3.divide = function (a, b, c) {
  if (b instanceof Vec3) {
    c.x = a.x / b.x;
    c.y = a.y / b.y;
    c.z = a.z / b.z;
  } else {
    c.x = a.x / b;
    c.y = a.y / b;
    c.z = a.z / b;
  }
  return c;
};
Vec3.cross = function (a, b, c) {
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
};
Vec3.unit = function (a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  return b;
};
Vec3.fromAngles = function (theta, phi) {
  return new Vec3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
Vec3.randomDirection = function () {
  return Vec3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vec3.min = function (a, b) {
  return new Vec3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
Vec3.max = function (a, b) {
  return new Vec3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
Vec3.lerp = function (a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
Vec3.fromArray = function (a) {
  return new Vec3(a[0], a[1], a[2]);
};
Vec3.angleBetween = function (a, b) {
  return a.angleTo(b);
};