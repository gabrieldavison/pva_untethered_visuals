// sets up a pre routed hydra sketch / p5canvas
// needs to be passed in a root node
// resolution will be the same as the root node
// also requires you to import style.css
// takes a p5 sketch in instance mode
export default function HydraP5Sketch(sketchNode, p5Sketch) {
  const hydraCanvas = document.createElement("canvas");
  sketchNode.appendChild(hydraCanvas);
  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
    enableStreamCapture: false,
  });
  hydra.setResolution(sketchNode.offsetWidth, sketchNode.offsetHeight);

  const p5Wrapper = document.createElement("div");
  p5Wrapper.id = "p5-wrapper";
  sketchNode.appendChild(p5Wrapper);
  const sketch = new p5(p5Sketch, "p5-wrapper");

  s1.init({ src: document.getElementById("p5-canvas") });
}
