var draw = function (g, width, height, mat) {
  g.beginPath();
  for (var i = 0; i < this.edges.length; i++) {
    var v0 = this.verts[this.edges[i][0]];
    var v1 = this.verts[this.edges[i][1]];
    var t_v0 = new Vector3();
    var t_v1 = new Vector3();
    mat.transform(v0, t_v0);
    mat.transform(v1, t_v1);
    var px0 = (width / 2) + t_v0.x * (width / 2);
    var py0 = (height / 2) - t_v0.y * (width / 2);
    var px1 = (width / 2) + t_v1.x * (width / 2);
    var py1 = (height / 2) - t_v1.y * (width / 2);
    g.moveTo(px0, py0);
    g.lineTo(px1, py1);
  }
  g.stroke();
}