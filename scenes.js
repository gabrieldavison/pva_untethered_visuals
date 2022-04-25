import * as m from "./midi.js";
import { MyAmp, MyRect, myCircle, Wave, genAddWaves } from "./sceneHelpers.js";

// Templates
const hydraInit = (p) => {
  p.pixelDensity(1);
};

export const init = () => {
  const hydraSketch = () => {
    src(s1).modulate(osc(10)).out(o0);
  };

  const p5Sketch = (p) => {
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      p.background(0);
      hydraInit(p);
    };

    p.draw = () => {
      p.background(0);
      p.circle(p.windowWidth / 2, p.windowHeight / 2, 200);
    };
  };

  return { hydraSketch, p5Sketch };
};

export const twoBoxWithSpeedControl = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // MIDI SETUP
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.3);
    const getSpeed2 = () => m.getSlider(7, 0.01, 0.3);
    const getModulatorAmp1 = () => m.getSlider(8, 0, 0.5);
    const getModulatorAmp2 = () => m.getSlider(9, 0, 0.5);
    const getmodWaveSpeed = () => m.getSlider(3, 0.01, 0.3);

    const addWaves = genAddWaves(p);

    let wave1, wave2, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave1 = new Wave(p);
      wave2 = new Wave(p);
      modWave = new Wave(p, 0.1);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const w1Offset = p.map(
        addWaves(wave1, modWave, getModulatorAmp1()),
        -1,
        1,
        0,
        p.width / 2
      );
      const h1Offset = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, p.height);
      const w2Offset = p.map(
        addWaves(wave2, modWave, getModulatorAmp2()),
        -1,
        1,
        0,
        p.width / 2
      );
      const h2Offset = p.map(addWaves(wave2, modWave, 0), -1, 1, 0, p.height);

      // Draw rects
      p.rect(
        0 + w1Offset,
        0 + h1Offset,
        p.width / 2 - w1Offset * 2,
        p.height - h1Offset * 2
      );
      p.rect(
        p.width / 2 + w2Offset,
        0 + h2Offset,
        p.width / 2 - w2Offset * 2,
        p.height - h2Offset * 2
      );

      // Advance Waves
      modWave.setSpeed(getmodWaveSpeed());
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      wave2.setSpeed(getSpeed2());
      wave2.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const twoBoxWithSpeedControlHydra = () => {
  const getModValue = () => m.getSlider(2, 0, 0.5);
  const hydraSketch = () => {
    src(s1)
      .modulate(noise(10), () => m.getSlider(2, 0, 0.1))
      .pixelate(
        () => m.getSlider(1, 1000, 50),
        () => m.getSlider(1, 1000, 50)
      )
      .out();
  };

  const p5Sketch = (p) => {
    // MIDI SETUP
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.3);
    const getSpeed2 = () => m.getSlider(7, 0.01, 0.3);
    const getModulatorAmp1 = () => m.getSlider(8, 0, 0.5);
    const getModulatorAmp2 = () => m.getSlider(9, 0, 0.5);
    const getmodWaveSpeed = () => m.getSlider(3, 0.01, 0.3);

    const addWaves = genAddWaves(p);

    let wave1, wave2, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave1 = new Wave(p);
      wave2 = new Wave(p);
      modWave = new Wave(p, 0.1);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const w1Offset = p.map(
        addWaves(wave1, modWave, getModulatorAmp1()),
        -1,
        1,
        0,
        p.width / 2
      );
      const h1Offset = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, p.height);
      const w2Offset = p.map(
        addWaves(wave2, modWave, getModulatorAmp2()),
        -1,
        1,
        0,
        p.width / 2
      );
      const h2Offset = p.map(addWaves(wave2, modWave, 0), -1, 1, 0, p.height);

      // Draw rects
      p.rect(
        0 + w1Offset,
        0 + h1Offset,
        p.width / 2 - w1Offset * 2,
        p.height - h1Offset * 2
      );
      p.rect(
        p.width / 2 + w2Offset,
        0 + h2Offset,
        p.width / 2 - w2Offset * 2,
        p.height - h2Offset * 2
      );

      // Advance Waves
      modWave.setSpeed(getmodWaveSpeed());
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      wave2.setSpeed(getSpeed2());
      wave2.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};
