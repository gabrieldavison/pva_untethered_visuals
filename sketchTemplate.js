const hydraSketch = () => {
  src(s1).out(o0);
};

const p5Sketch = (p) => {
  p.setup = () => {
    // Leave canvas creation code
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    cnv.id("p5-canvas");
  };

  p.draw = () => {};
};
export { p5Sketch, hydraSketch };
