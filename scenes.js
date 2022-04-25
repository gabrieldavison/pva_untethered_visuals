import * as m from "./midi.js";
import {
  MyAmp,
  MyRect,
  myCircle,
  Wave,
  genAddWaves,
  Easer,
} from "./sceneHelpers.js";

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

export const oneBoxWithAudioControl = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions

    const getAmpMultiplier = () => m.getSlider(6, 1, 1000);
    const getInterval = () => m.getSlider(7, 1, 200);

    const e = new Easer(0, 0);
    let mic, amp;

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);

      // Sets up Mic
      mic = new p5.AudioIn();
      mic.start();
      amp = new p5.Amplitude();
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const level = amp.getLevel() * getAmpMultiplier();
      e.tx = p.map(level, 0, 1.5, 0, p.width);
      e.ty = p.map(level, 0, 1.5, 0, p.height);

      // Draw rects
      p.rect(
        p.width / 2,
        p.height / 2,
        // Need to swap this out to go from 0 -> w1 offset, need to do some more mapping
        e.x,
        e.y
      );
      const interval = getInterval();
      e.tick(Math.floor(interval));
    };
    p.mousePressed = () => {
      p.userStartAudio();
      amp.setInput(mic);
      console.log("audio start");
    };
  };

  return { hydraSketch, p5Sketch };
};

export const oneBoxWithAudioControlHydra = () => {
  const hydraSketch = () => {
    src(s1)
      .modulate(noise(10), () => m.getSlider(8, 0, 0.1))
      .pixelate(
        () => m.getSlider(9, 1000, 50),
        () => m.getSlider(9, 1000, 50)
      )
      .out();
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions

    const getAmpMultiplier = () => m.getSlider(6, 1, 1000);
    const getInterval = () => m.getSlider(7, 1, 200);

    const e = new Easer(0, 0);
    let mic, amp;

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);

      // Sets up Mic
      mic = new p5.AudioIn();
      mic.start();
      amp = new p5.Amplitude();
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const level = amp.getLevel() * getAmpMultiplier();
      e.tx = p.map(level, 0, 1.5, 0, p.width);
      e.ty = p.map(level, 0, 1.5, 0, p.height);

      // Draw rects
      p.rect(
        p.width / 2,
        p.height / 2,
        // Need to swap this out to go from 0 -> w1 offset, need to do some more mapping
        e.x,
        e.y
      );
      const interval = getInterval();
      e.tick(Math.floor(interval));
    };
    p.mousePressed = () => {
      p.userStartAudio();
      amp.setInput(mic);
      console.log("audio start");
    };
  };

  return { hydraSketch, p5Sketch };
};

export const fourBoxWithSpeedControl = () => {
  const hydraSketch = () => {
    src(s1)
      .modulate(noise(20), () => m.getSlider(2, 0, 0.5))
      .pixelate(
        () => m.getSlider(3, 1000, 5),
        () => m.getSlider(3, 1000, 5)
      )
      .out();
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.5);
    const getSpeed2 = () => m.getSlider(7, 0.01, 0.5);
    const getSpeed3 = () => m.getSlider(8, 0.01, 0.5);
    const getSpeed4 = () => m.getSlider(9, 0.01, 0.5);
    const addWaves = genAddWaves(p);

    let wave1, wave2, wave3, wave4, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave1 = new Wave(p);
      wave2 = new Wave(p);
      wave3 = new Wave(p);
      wave4 = new Wave(p);
      modWave = new Wave(p, 0.1);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets

      const rectW = p.width / 2;
      const rectH = p.height / 2;

      const r1w = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectW);
      const r1h = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectH);
      const r2w = p.map(addWaves(wave2, modWave, 0), -1, 1, 0, rectW);
      const r2h = p.map(addWaves(wave2, modWave, 0), -1, 1, 0, rectH);
      const r3w = p.map(addWaves(wave3, modWave, 0), -1, 1, 0, rectW);
      const r3h = p.map(addWaves(wave3, modWave, 0), -1, 1, 0, rectH);
      const r4w = p.map(addWaves(wave4, modWave, 0), -1, 1, 0, rectW);
      const r4h = p.map(addWaves(wave4, modWave, 0), -1, 1, 0, rectH);

      // Draw rects
      p.rect(rectW / 2, rectH / 2, r1w, r1h);
      p.rect(rectW * 1.5, rectH / 2, r2w, r2h);
      p.rect(rectW / 2, rectH * 1.5, r3w, r3h);
      p.rect(rectW * 1.5, rectH * 1.5, r4w, r4h);

      // Advance Waves
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      wave2.setSpeed(getSpeed2());
      wave2.tick();
      wave3.setSpeed(getSpeed3());
      wave3.tick();
      wave4.setSpeed(getSpeed4());
      wave4.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};

// 4 Concentric squares that appear and disappear
export const fourBoxWithSpeedControlFeedback = () => {
  const hydraSketch = () => {
    src(s1).diff(o1).out(o1);
    src(o1).saturate(0).contrast(2).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.5);
    const getSpeed2 = () => m.getSlider(7, 0.01, 0.5);
    const getSpeed3 = () => m.getSlider(8, 0.01, 0.5);
    const getSpeed4 = () => m.getSlider(9, 0.01, 0.5);
    const addWaves = genAddWaves(p);

    let wave1, wave2, wave3, wave4, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave1 = new Wave(p);
      wave2 = new Wave(p);
      wave3 = new Wave(p);
      wave4 = new Wave(p);
      modWave = new Wave(p, 0.1);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets

      const rectW = p.width / 2;
      const rectH = p.height / 2;

      const r1w = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectW);
      const r1h = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectH);
      const r2w = p.map(addWaves(wave2, modWave, 0), -1, 1, 0, rectW);
      const r2h = p.map(addWaves(wave2, modWave, 0), -1, 1, 0, rectH);
      const r3w = p.map(addWaves(wave3, modWave, 0), -1, 1, 0, rectW);
      const r3h = p.map(addWaves(wave3, modWave, 0), -1, 1, 0, rectH);
      const r4w = p.map(addWaves(wave4, modWave, 0), -1, 1, 0, rectW);
      const r4h = p.map(addWaves(wave4, modWave, 0), -1, 1, 0, rectH);

      // Draw rects
      p.rect(rectW / 2, rectH / 2, r1w, r1h);
      p.rect(rectW * 1.5, rectH / 2, r2w, r2h);
      p.rect(rectW / 2, rectH * 1.5, r3w, r3h);
      p.rect(rectW * 1.5, rectH * 1.5, r4w, r4h);

      // Advance Waves
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      wave2.setSpeed(getSpeed2());
      wave2.tick();
      wave3.setSpeed(getSpeed3());
      wave3.tick();
      wave4.setSpeed(getSpeed4());
      wave4.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};
