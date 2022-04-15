const hydraSketch = () => {
  src(s1)
    .diff(src(o0).modulate(osc(100)).invert())
    .out(o0);
};

const p5Sketch = (p) => {
  p.setup = () => {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    cnv.id("p5-canvas");
    p.noFill();
    p.background(255);
    p.strokeWeight(2);
    p.stroke(0, 25);
  };

  p.draw = () => {
    if (p.mouseIsPressed && p.mouseButton == p.LEFT) {
      p.push();
      p.translate(p.width / 2, p.height / 2);

      var circleResolution = p.int(p.map(p.mouseY + 100, 0, p.height, 2, 10));
      var radius = p.mouseX - p.width / 2;
      var angle = p.TAU / circleResolution;
      p.beginShape();
      for (var i = 0; i <= circleResolution; i++) {
        var x = p.cos(angle * i) * radius;
        var y = p.sin(angle * i) * radius;
        p.vertex(x, y);
      }
      p.endShape();

      p.pop();
    }
  };

  p.keyReleased = () => {
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };
};
export { p5Sketch, hydraSketch };
