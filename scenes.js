import * as m from "./midi.js";
import * as a from "./audio.js";
import {
  MyAmp,
  MyRect,
  myCircle,
  Wave,
  genAddWaves,
  Easer,
  hydraInit,
} from "./sceneHelpers.js";

// Templates

// export const parallelLines = () => {
//   const hydraSketch = () => {
//     src(s1).out(o0);
//   };

//   const p5Sketch = (p) => {
//     const numLines = 50;
//     p.setup = () => {
//       let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
//       cnv.id("p5-canvas");
//       hydraInit(p);
//     };
//     p.draw = () => {};
//   };

//   return { hydraSketch, p5Sketch };
// };

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

    const amp = new a.MyAmp();
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);

      // Sets up Mic
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
      a.start();
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
    // a.start();
    const amp = new a.MyAmp();
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);

      // Sets up Mic
      // mic = new p5.AudioIn();
      // mic.start();
      // amp = new p5.Amplitude();
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
      // p.userStartAudio();
      // amp.setInput(mic);
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

export const fourBoxWithSpeedControlFeedbackAudio = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.5);
    const getSpeed2 = () => m.getSlider(7, 0.01, 0.5);
    const getSpeed3 = () => m.getSlider(8, 0.01, 0.5);
    const getSpeed4 = () => m.getSlider(9, 0.01, 0.5);
    const addWaves = genAddWaves(p);

    let wave1, wave2, wave3, wave4, modWave;

    const amp = new a.MyAmpSplit();
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

      const level1 = amp.getLevel1();
      const level2 = amp.getLevel2();

      const w1 = p.map(level1, 0, 1, 0, rectW);
      const h1 = p.map(level1, 0, 1, 0, rectH);
      const w2 = p.map(level2, 0, 1, 0, rectW);
      const h2 = p.map(level2, 0, 1, 0, rectH);
      // Draw rects
      p.rect(rectW / 2, rectH / 2, w1, h1);
      p.rect(rectW * 1.5, rectH / 2, w2, h2);
      p.rect(rectW / 2, rectH * 1.5, w1, h1);
      p.rect(rectW * 1.5, rectH * 1.5, w2, h2);

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

    p.mousePressed = () => {
      a.start();
    };
  };
  return { hydraSketch, p5Sketch };
};

// This doesnt look good when the camera isn't feeding back
// This does give some nice geometric patterns when the camera is feeding back
export const fourBoxWithSpeedControlVideoInput = () => {
  const hydraSketch = () => {
    s0.initCam(0);
    src(s0).modulateHue(osc(10)).out(o1);
    src(s1).diff(o1).contrast(2).saturate(0).out(o0);
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

export const galaxyHydra = () => {
  const hydraSketch = () => {
    src(s1)
      .modulate(osc(() => m.getSlider(7, 1, 50)))
      .out(o0);
  };

  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;
    const getMaxRad = () => m.getSlider(6, 10, 1000);
    const getStrokeWeight = () => m.getSlider(8, 1, 10);
    const getXyOffset = () => m.getSlider(9, 2, 100);
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.frameRate(frameRate);
      // p.noStroke();
      p.stroke(255);
    };
    p.draw = () => {
      const numCircles = getMaxRad();
      const maxRad = getMaxRad();
      const inc = maxRad / numCircles;
      p.strokeWeight(getStrokeWeight());
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      for (let i = 0; i < numCircles; i++) {
        for (let j = 0; j < numPoints; j++) {
          const rad = (i + 1) * inc;
          const a = p.random() * 2 * p.PI;
          const r = rad * p.sqrt(p.random());
          const x = r * p.cos(a);
          const y = r * p.sin(a);
          const xyOffset = getXyOffset();
          const x2 = p.random(-xyOffset, xyOffset);
          const y2 = p.random(-xyOffset, xyOffset);
          // p.square(x, y, 3);
          p.line(x, y, x + x2, y + y2);
        }
      }
    };
  };

  return { hydraSketch, p5Sketch };
};

export const galaxyWithAudioInput = () => {
  const hydraSketch = () => {
    src(s1)
      .modulate(osc(() => m.getSlider(7, 1, 50)))
      .blend(o0)
      .out(o0);
  };

  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;

    let amp = new a.MyAmp();
    const getAmpMult = () => m.getSlider(6, 1, 10);
    const getStrokeWeight = () => m.getSlider(8, 1, 10);
    const getXyOffset = () => m.getSlider(9, 2, 100);

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.frameRate(frameRate);
      p.stroke(255);
    };

    p.draw = () => {
      const ampMult = getAmpMult();
      const numCircles = p.map(amp.getLevel() * ampMult, 0, 1, 50, 1000);
      const maxRad = p.map(amp.getLevel() * ampMult, 0, 1, 50, 1000);
      const inc = maxRad / numCircles;
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      p.strokeWeight(getStrokeWeight());
      for (let i = 0; i < numCircles; i++) {
        for (let j = 0; j < numPoints; j++) {
          const rad = (i + 1) * inc;
          const a = p.random() * 2 * p.PI;
          const r = rad * p.sqrt(p.random());
          const x = r * p.cos(a);
          const y = r * p.sin(a);
          const xyOffset = getXyOffset();
          const x2 = p.random(-xyOffset, xyOffset);
          const y2 = p.random(-xyOffset, xyOffset);
          p.line(x, y, x + x2, y + y2);
        }
      }
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

// This one has some cool masking effects
// transparent p5 background masked by effect is something to try with other sketches
export const galaxyHydraVideoInput = () => {
  const hydraSketch = () => {
    s0.initCam(0);
    src(s0).out(o1);

    solid(0, 0, 0)
      .layer(src(o1).mask(s1))
      .modulate(osc(() => m.getSlider(7, 1, 50)))
      .saturate(0)
      .out();
  };

  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;
    const getMaxRad = () => m.getSlider(6, 10, 1000);
    const getStrokeWeight = () => m.getSlider(8, 1, 10);
    const getXyOffset = () => m.getSlider(9, 2, 100);
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.frameRate(frameRate);
      p.stroke(255);
    };
    p.draw = () => {
      const numCircles = getMaxRad();
      const maxRad = getMaxRad();
      const inc = maxRad / numCircles;
      p.strokeWeight(getStrokeWeight());
      // p.background(0)
      // Hydra is providing the background here so need to keep default clear background
      p.clear();
      p.translate(p.width / 2, p.height / 2);
      for (let i = 0; i < numCircles; i++) {
        for (let j = 0; j < numPoints; j++) {
          const rad = (i + 1) * inc;
          const a = p.random() * 2 * p.PI;
          const r = rad * p.sqrt(p.random());
          const x = r * p.cos(a);
          const y = r * p.sin(a);
          const xyOffset = getXyOffset();
          const x2 = p.random(-xyOffset, xyOffset);
          const y2 = p.random(-xyOffset, xyOffset);
          // p.square(x, y, 3);
          p.line(x, y, x + x2, y + y2);
        }
      }
    };
  };

  return { hydraSketch, p5Sketch };
};

// This one is pretty hard to paramaterize
// might have to go with multiple presets instead where maxSizer and numSquares are hard coded
export const rotatingSquares = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Parameterize these

    const maxSize = 5000;
    const numSquares = 2000; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getSizeMult = () => m.getSlider(6, 0.00001, 500);
    const getRotSpeedMult = () => m.getSlider(7, 0, 100);
    const getSqMod = () => {
      const vals = [0, 3, 4, 5, 6, 7, 8, 9];
      const i = parseInt(m.getSlider(8, 0, 7));
      return vals[i];
    };

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.rectMode(p.CENTER);
      p.noStroke();

      genSquares = (maxSize, num) => {
        const chunk = maxSize / num;
        const r = (acc, _v, i) => {
          const size = (i + 1) * chunk;
          const x = maxSize / 2 - 0.5 * size;
          const y = maxSize / 2 - 0.5 * size;
          return [...acc, { size, x, y, rot: p.random(0, 1) }];
        };
        return [...Array(num)].reduce(r, []);
      };
      sqs = genSquares(maxSize, numSquares).reverse();
    };

    p.draw = () => {
      p.background(0);
      const sqMod = getSqMod();
      sqs.forEach((sq, i) => {
        if (i % sqMod === 0) return;
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        const sizeMult = getSizeMult();
        p.rect(0, 0, sq.size + sizeMult, sq.size + sizeMult);
        p.pop();

        const rotSpeedMult = getRotSpeedMult();
        i % 2 === 0
          ? (sqs[i].rot += p.random(
              rotSpeedMin * rotSpeedMult,
              rotSpeedMax * rotSpeedMult
            ))
          : (sqs[i].rot += p.random(
              -rotSpeedMax * rotSpeedMult,
              -rotSpeedMin * rotSpeedMult
            ));
      });
    };
  };

  return { hydraSketch, p5Sketch };
};

export const rotatingSquaresBig = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Parameterize these

    const maxSize = 5000;
    const numSquares = 200; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getSizeMult = () => m.getSlider(6, 0.00001, 500);
    const getRotSpeedMult = () => m.getSlider(7, 0, 100);
    const getSqMod = () => {
      const vals = [0, 3, 4, 5, 6, 7, 8, 9];
      const i = parseInt(m.getSlider(8, 0, 7));
      return vals[i];
    };

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.rectMode(p.CENTER);
      p.noStroke();

      genSquares = (maxSize, num) => {
        const chunk = maxSize / num;
        const r = (acc, _v, i) => {
          const size = (i + 1) * chunk;
          const x = maxSize / 2 - 0.5 * size;
          const y = maxSize / 2 - 0.5 * size;
          return [...acc, { size, x, y, rot: p.random(0, 1) }];
        };
        return [...Array(num)].reduce(r, []);
      };
      sqs = genSquares(maxSize, numSquares).reverse();
    };

    p.draw = () => {
      p.background(0);
      const sqMod = getSqMod();
      sqs.forEach((sq, i) => {
        if (i % sqMod === 0) return;
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        const sizeMult = getSizeMult();
        p.rect(0, 0, sq.size + sizeMult, sq.size + sizeMult);
        p.pop();

        const rotSpeedMult = getRotSpeedMult();
        i % 2 === 0
          ? (sqs[i].rot += p.random(
              rotSpeedMin * rotSpeedMult,
              rotSpeedMax * rotSpeedMult
            ))
          : (sqs[i].rot += p.random(
              -rotSpeedMax * rotSpeedMult,
              -rotSpeedMin * rotSpeedMult
            ));
      });
    };
  };

  return { hydraSketch, p5Sketch };
};

// much grungier
export const rotatingSquaresBigHydra = () => {
  const hydraSketch = () => {
    src(s1)
      .diff(src(o0).modulateScale(o0))
      .blend(o0)
      .contrast(1.5)
      .pixelate(
        () => m.getSlider(9, 5, 1000),
        () => m.getSlider(9, 5, 1000)
      )
      .out(o0);
  };

  const p5Sketch = (p) => {
    // Parameterize these

    const maxSize = 5000;
    const numSquares = 200; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getSizeMult = () => m.getSlider(6, 0.00001, 500);
    const getRotSpeedMult = () => m.getSlider(7, 0, 100);
    const getSqMod = () => {
      const vals = [0, 3, 4, 5, 6, 7, 8, 9];
      const i = parseInt(m.getSlider(8, 0, 7));
      return vals[i];
    };

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.rectMode(p.CENTER);
      p.noStroke();

      genSquares = (maxSize, num) => {
        const chunk = maxSize / num;
        const r = (acc, _v, i) => {
          const size = (i + 1) * chunk;
          const x = maxSize / 2 - 0.5 * size;
          const y = maxSize / 2 - 0.5 * size;
          return [...acc, { size, x, y, rot: p.random(0, 1) }];
        };
        return [...Array(num)].reduce(r, []);
      };
      sqs = genSquares(maxSize, numSquares).reverse();
    };

    p.draw = () => {
      p.background(0);
      const sqMod = getSqMod();
      sqs.forEach((sq, i) => {
        if (i % sqMod === 0) return;
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        const sizeMult = getSizeMult();
        p.rect(0, 0, sq.size + sizeMult, sq.size + sizeMult);
        p.pop();

        const rotSpeedMult = getRotSpeedMult();
        i % 2 === 0
          ? (sqs[i].rot += p.random(
              rotSpeedMin * rotSpeedMult,
              rotSpeedMax * rotSpeedMult
            ))
          : (sqs[i].rot += p.random(
              -rotSpeedMax * rotSpeedMult,
              -rotSpeedMin * rotSpeedMult
            ));
      });
    };
  };

  return { hydraSketch, p5Sketch };
};

// Using modulation to bring in the camera leads to some wobbly distortion around the outside
export const rotatingSquaresVideoInput = () => {
  const hydraSketch = () => {
    s0.initCam(0);
    src(s0).contrast(2).out(o1);
    src(s1).modulate(o1, 0.5).saturate(0).out(o0);
  };

  const p5Sketch = (p) => {
    // Parameterize these

    const maxSize = 5000;
    const numSquares = 2000; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getSizeMult = () => m.getSlider(6, 0.00001, 500);
    const getRotSpeedMult = () => m.getSlider(7, 0, 100);
    const getSqMod = () => {
      const vals = [0, 3, 4, 5, 6, 7, 8, 9];
      const i = parseInt(m.getSlider(8, 0, 7));
      return vals[i];
    };

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.rectMode(p.CENTER);
      p.noStroke();

      genSquares = (maxSize, num) => {
        const chunk = maxSize / num;
        const r = (acc, _v, i) => {
          const size = (i + 1) * chunk;
          const x = maxSize / 2 - 0.5 * size;
          const y = maxSize / 2 - 0.5 * size;
          return [...acc, { size, x, y, rot: p.random(0, 1) }];
        };
        return [...Array(num)].reduce(r, []);
      };
      sqs = genSquares(maxSize, numSquares).reverse();
    };

    p.draw = () => {
      p.background(0);
      const sqMod = getSqMod();
      sqs.forEach((sq, i) => {
        if (i % sqMod === 0) return;
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        const sizeMult = getSizeMult();
        p.rect(0, 0, sq.size + sizeMult, sq.size + sizeMult);
        p.pop();

        const rotSpeedMult = getRotSpeedMult();
        i % 2 === 0
          ? (sqs[i].rot += p.random(
              rotSpeedMin * rotSpeedMult,
              rotSpeedMax * rotSpeedMult
            ))
          : (sqs[i].rot += p.random(
              -rotSpeedMax * rotSpeedMult,
              -rotSpeedMin * rotSpeedMult
            ));
      });
    };
  };

  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresAudioSize = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const getAmpMult = () => m.getSlider(6, 0.1, 10);
  const getTriggerInterval = () => parseInt(m.getSlider(7, 100, 10));
  const getInterval = () => m.getSlider(8, 200, 2000);

  const p5Sketch = (p) => {
    const cols = 1;
    const rows = 1;
    const numRects = 100;
    const triggerInterval = 30; //fps
    const interval = 500; //ms

    let rects;
    const amp = new a.MyAmp();
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.stroke(255);
      p.noFill();
      p.rectMode(p.CENTER);
      const rectWidth = p.width / cols;
      const rectHeight = p.height / rows;
      rects = [...Array(rows)].map((_v, i) =>
        [...Array(cols)].map((_v, j) => {
          const multX = j;
          const multY = i;
          const x = multX * rectWidth + 0.5 * rectWidth;
          const y = multY * rectHeight + 0.5 * rectHeight;
          return new MyRect(p, x, y, rectWidth, rectHeight, numRects);
        })
      );
    };
    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) =>
        row.forEach((rect) => rect.tick(getInterval() / 60))
      );
      if (p.frameCount % getTriggerInterval() === 0) {
        rects.forEach((row) =>
          row.forEach((rect) =>
            rect.setOffset(p.random(-5, 5), p.random(-5, 5))
          )
        );
      }
      const level = p.map(amp.getLevel() * getAmpMult(), 0, 1, 10, 100);
      rects.forEach((row) => row.forEach((rect) => (rect.numRects = level)));
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresAudioTrigger = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const cols = 1;
    const rows = 1;
    const numRects = 100;
    const maxMovement = 100;
    const triggerInterval = 30; //fps
    const interval = 500; //ms

    let rects;
    const amp = new a.MyAmp();
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.stroke(255);
      p.noFill();
      p.rectMode(p.CENTER);
      const rectWidth = p.width / cols;
      const rectHeight = p.height / rows;
      rects = [...Array(rows)].map((_v, i) =>
        [...Array(cols)].map((_v, j) => {
          const multX = j;
          const multY = i;
          const x = multX * rectWidth + 0.5 * rectWidth;
          const y = multY * rectHeight + 0.5 * rectHeight;
          return new MyRect(p, x, y, rectWidth, rectHeight, numRects);
        })
      );
    };

    const triggerMovement = () => {
      rects.forEach((row) =>
        row.forEach((rect) => rect.setOffset(p.random(-5, 5), p.random(-5, 5)))
      );
    };

    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) => row.forEach((rect) => rect.tick(interval / 60)));

      const level = amp.getLevel();
      if (level > 0.1) {
        triggerMovement();
      }
    };
    p.mousePressed = () => {
      a.start();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresAudioTrigger4 = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const cols = 2;
    const rows = 2;
    const numRects = 50;
    const maxMovement = 100;
    const triggerInterval = 30; //fps
    const interval = 500; //ms

    let rects;
    const amp = new a.MyAmp();
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.stroke(255);
      p.noFill();
      p.rectMode(p.CENTER);
      const rectWidth = p.width / cols;
      const rectHeight = p.height / rows;
      rects = [...Array(rows)].map((_v, i) =>
        [...Array(cols)].map((_v, j) => {
          const multX = j;
          const multY = i;
          const x = multX * rectWidth + 0.5 * rectWidth;
          const y = multY * rectHeight + 0.5 * rectHeight;
          return new MyRect(p, x, y, rectWidth, rectHeight, numRects);
        })
      );
    };

    const triggerMovement = () => {
      rects.forEach((row) =>
        row.forEach((rect) => rect.setOffset(p.random(-5, 5), p.random(-5, 5)))
      );
    };

    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) => row.forEach((rect) => rect.tick(interval / 60)));

      const level = amp.getLevel();
      if (level > 0.1) {
        triggerMovement();
      }
    };
    p.mousePressed = () => {
      a.start();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresVideoInput = () => {
  const hydraSketch = () => {
    s0.initCam(0);
    src(s0).saturate(0).out(o1);
    src(s1).mult(src(o1).contrast(3), 0.5).contrast(2).out();
  };

  const getMaxMovement = () => m.getSlider(6, 5, 200);
  const getTriggerInterval = () => parseInt(m.getSlider(7, 100, 10));
  const getInterval = () => m.getSlider(8, 200, 2000);

  const p5Sketch = (p) => {
    const cols = 5;
    const rows = 5;
    const numRects = 20;
    const maxMovement = 100; // Maximum distance the squares will move
    const triggerInterval = 30; //fps
    const interval = 300; //ms

    let rects;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.stroke(255);
      p.noFill();
      p.rectMode(p.CENTER);
      const rectWidth = p.width / cols;
      const rectHeight = p.height / rows;
      rects = [...Array(rows)].map((_v, i) =>
        [...Array(cols)].map((_v, j) => {
          const multX = j;
          const multY = i;
          const x = multX * rectWidth + 0.5 * rectWidth;
          const y = multY * rectHeight + 0.5 * rectHeight;
          return new MyRect(p, x, y, rectWidth, rectHeight, numRects);
        })
      );
    };
    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) =>
        row.forEach((rect) => rect.tick(getInterval() / 60))
      );
      if (p.frameCount % getTriggerInterval() === 0) {
        rects.forEach((row) =>
          row.forEach((rect) => {
            const maxMovement = getMaxMovement();
            rect.setOffset(
              p.random(-maxMovement, maxMovement),
              p.random(-maxMovement, maxMovement)
            );
          })
        );
      }
    };
    // p.mousePressed = () => {
    //   rects.forEach((row) =>
    //     row.forEach((rect) =>
    //       rect.setOffset(
    //         p.random(-maxMovement, maxMovement),
    //         p.random(-maxMovement, maxMovement)
    //       )
    //     )
    //   );
    // };
  };

  return { hydraSketch, p5Sketch };
};
export const squaresInSquaresHydra = () => {
  const hydraSketch = () => {
    src(s1)
      .modulate(noise(2).rotate(1.4, 0.1), () => m.getSlider(3, 0, 0.2))
      .pixelate(
        () => m.getSlider(2, 2, 1200),
        () => m.getSlider(2, 2, 1200)
      )
      .out();
  };

  const getMaxMovement = () => m.getSlider(6, 5, 200);
  const getTriggerInterval = () => parseInt(m.getSlider(7, 100, 10));
  const getInterval = () => m.getSlider(8, 200, 2000);
  const getStrokeWeight = () => m.getSlider(9, 0.1, 5);

  const p5Sketch = (p) => {
    const cols = 5;
    const rows = 5;
    const numRects = 20;

    let rects;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.stroke(255);
      p.noFill();
      p.rectMode(p.CENTER);
      const rectWidth = p.width / cols;
      const rectHeight = p.height / rows;
      rects = [...Array(rows)].map((_v, i) =>
        [...Array(cols)].map((_v, j) => {
          const multX = j;
          const multY = i;
          const x = multX * rectWidth + 0.5 * rectWidth;
          const y = multY * rectHeight + 0.5 * rectHeight;
          return new MyRect(p, x, y, rectWidth, rectHeight, numRects);
        })
      );
    };
    p.draw = () => {
      p.strokeWeight(getStrokeWeight());
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) =>
        row.forEach((rect) => rect.tick(getInterval() / 60))
      );
      if (p.frameCount % getTriggerInterval() === 0) {
        rects.forEach((row) =>
          row.forEach((rect) => {
            const maxMovement = getMaxMovement();
            rect.setOffset(
              p.random(-maxMovement, maxMovement),
              p.random(-maxMovement, maxMovement)
            );
          })
        );
      }
    };
  };

  return { hydraSketch, p5Sketch };
};

// This one looks way better with just two circles
export const moireCirclesHydraVideoInput = () => {
  // This one has the circles moving on timer
  const hydraSketch = () => {
    s0.initCam(0);
    src(s0).saturate(0).out(o1);
    src(s1)
      .diff(o1)
      .contrast(2)
      .pixelate(
        () => m.getSlider(7, 10, 1500),
        () => m.getSlider(7, 10, 1500)
      )
      .out(o0);
  };

  const p5Sketch = (p) => {
    const maxCircles = 150;
    const maxRad = 3000;
    const circleCount = 2;
    const triggerInterval = 60; //fps

    let circles;

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);

      p.noFill();
      circles = [...Array(circleCount)].map(
        () =>
          new myCircle(
            p,
            p.random(0, p.width),
            p.random(0, p.height),
            maxRad,
            maxCircles
          )
      );
      p.stroke(255);
      p.strokeWeight(4);
    };

    p.draw = () => {
      p.background(0);
      circles.forEach((c) => c.draw());
      circles.forEach((c) => c.tick(3000 / 60));
      if (p.frameCount % triggerInterval === 0) {
        circles.forEach((c) =>
          c.move(p.random(0, p.width), p.random(0, p.height))
        );
      }
      circles.forEach((c) => (c.numCircles = m.getSlider(6, 2, maxCircles)));
    };

    p.mousePressed = () => {
      circles.forEach((c) =>
        c.move(p.random(0, p.width), p.random(0, p.height))
      );
    };
  };

  return { hydraSketch, p5Sketch };
};

export const moireCirclesHydra = () => {
  // This one has the circles moving on timer
  const hydraSketch = () => {
    src(s1)
      .contrast(2)
      .pixelate(
        () => m.getSlider(7, 10, 1500),
        () => m.getSlider(7, 10, 1500)
      )
      .out(o0);
  };

  const p5Sketch = (p) => {
    const maxCircles = 150;
    const maxRad = 3000;
    const circleCount = 2;
    const triggerInterval = 60; //fps

    let circles;

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);

      p.noFill();
      circles = [...Array(circleCount)].map(
        () =>
          new myCircle(
            p,
            p.random(0, p.width),
            p.random(0, p.height),
            maxRad,
            maxCircles
          )
      );
      p.stroke(255);
      p.strokeWeight(4);
    };

    p.draw = () => {
      p.background(0);
      circles.forEach((c) => c.draw());
      circles.forEach((c) => c.tick(3000 / 60));
      if (p.frameCount % triggerInterval === 0) {
        circles.forEach((c) =>
          c.move(p.random(0, p.width), p.random(0, p.height))
        );
      }
      circles.forEach((c) => (c.numCircles = m.getSlider(6, 2, maxCircles)));
    };

    p.mousePressed = () => {
      circles.forEach((c) =>
        c.move(p.random(0, p.width), p.random(0, p.height))
      );
    };
  };

  return { hydraSketch, p5Sketch };
};
