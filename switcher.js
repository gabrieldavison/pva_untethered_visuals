let currentP5 = null;

const sketchNode = document.getElementById("sketch");

const resetScene = () => {
  if (currentP5 !== null) {
    currentP5.remove();
  }
  if (sketchNode.hasChildNodes()) {
    sketchNode.replaceChildren();
  }
};

const initScene = (scene) => {
  resetScene();
  const { hydraSketch, p5Sketch } = scene();

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
  currentP5 = new p5(p5Sketch, "p5-wrapper");
  s1.init({ src: document.getElementById("p5-canvas") });
  hydraSketch();
};

export { initScene };
