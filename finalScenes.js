import { initScene } from "../switcher.js";
import * as a from "./audio.js";
import * as m from "/midi.js";
import {
  MyAmp,
  MyRect,
  myCircle,
  Wave,
  genAddWaves,
  Easer,
  hydraInit,
} from "/sceneHelpers.js";

////// BOX SKETCHES //////

const boxHydra = () => {
  src(s1)
    .modulate(noise(5), () => m.getSlider(2, 0, 0.5))
    .pixelate(
      () => m.getSlider(3, 1000, 2),
      () => m.getSlider(3, 1000, 2)
    )
    .out();
};

//// ONE BOX SKETCHES
// AUDIO

export const oneBoxAudio = () => {
  const hydraSketch = boxHydra;

  const p5Sketch = (p) => {
    const getAmpMultiplier = () => m.getSlider(6, 1, 1000);
    const getInterval = () => m.getSlider(7, 1, 200);

    const e = new Easer(0, 0);
    const amp = new a.MyAmp();
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const level = amp.getLevel() * getAmpMultiplier();
      e.tx = p.map(level, 0, 1.5, 0, p.width);
      e.ty = p.map(level, 0, 1.5, 0, p.height);

      // Draw rects
      p.rect(p.width / 2, p.height / 2, e.x, e.y);
      const interval = getInterval();
      e.tick(Math.floor(interval));
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

// MANUAL SPEED
export const oneBox = () => {
  const hydraSketch = boxHydra;
  const getSpeed = () => m.getSlider(6, 0.01, 0.7);
  const p5Sketch = (p) => {
    let wave, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      p.rectMode(p.CENTER);
      wave = new Wave(p);
      modWave = new Wave(p);
    };

    p.draw = () => {
      p.background(255);

      const xSize = p.map(wave.val(), -1, 1, 0, p.width);
      const ySize = p.map(wave.val(), -1, 1, 0, p.height);

      // Draw rects
      p.rect(p.width / 2, p.height / 2, xSize, ySize);

      wave.setSpeed(getSpeed());
      wave.tick();
    };
  };

  return { hydraSketch, p5Sketch };
};

//// TWO BOXES

// AUDIO

export const twoBoxAudio = () => {
  const hydraSketch = boxHydra;

  const getAmpMultiplier = () => m.getSlider(6, 1, 1000);
  const getInterval = () => m.getSlider(7, 1, 200);

  const p5Sketch = (p) => {
    const getSpeed = () => m.getSlider(6, 0.01, 0.5);
    const amp = new a.MyAmpSplit();
    const easer1 = new Easer();
    const easer2 = new Easer();
    let wave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave = new Wave(p);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets

      const rectW = p.width / 2;
      const rectH = p.height;

      const level1 = amp.getLevel1() * getAmpMultiplier();
      const level2 = amp.getLevel2() * getAmpMultiplier();
      easer1.tx = p.map(level1, 0, 1.5, 0, p.width / 2);
      easer1.ty = p.map(level1, 0, 1.5, 0, p.height);
      easer2.tx = p.map(level2, 0, 1.5, 0, p.width / 2);
      easer2.ty = p.map(level2, 0, 1.5, 0, p.height);

      // Draw rects
      p.rect(rectW * 0.5, rectH * 0.5, easer1.x, easer1.y);
      p.rect(rectW * 1.5, rectH * 0.5, easer2.x, easer2.y);

      // Advance Waves
      wave.setSpeed(getSpeed());
      wave.tick();
      // Advance Easer
      const interval = getInterval();
      easer1.tick(Math.floor(interval));
      easer2.tick(Math.floor(interval));
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

// MANUAL SPEED
export const twoBox = () => {
  const hydraSketch = boxHydra;

  const p5Sketch = (p) => {
    const getSpeed = () => m.getSlider(6, 0.01, 0.5);

    let wave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave = new Wave(p);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets

      const rectW = p.width / 2;
      const rectH = p.height;

      const r1w = p.map(wave.val(), -1, 1, 0, rectW);
      const r1h = p.map(wave.val(), -1, 1, 0, rectH);
      const r2w = p.map(wave.val(), -1, 1, 0, rectW);
      const r2h = p.map(wave.val(), -1, 1, 0, rectH);

      // Draw rects
      p.rect(rectW * 0.5, rectH * 0.5, r1w, r1h);
      p.rect(rectW * 1.5, rectH * 0.5, r2w, r2h);

      // Advance Waves
      wave.setSpeed(getSpeed());
      wave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};
export const twoBoxInverted = () => {
  const hydraSketch = boxHydra;

  const p5Sketch = (p) => {
    const getSpeed = () => m.getSlider(6, 0.01, 0.5);

    let wave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave = new Wave(p);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets

      const rectW = p.width / 2;
      const rectH = p.height;

      const r1w = p.map(wave.val(), -1, 1, 0, rectW);
      const r1h = p.map(wave.val(), -1, 1, 0, rectH);
      const r2w = p.map(wave.val(), -1, 1, rectW, 0);
      const r2h = p.map(wave.val(), -1, 1, rectH, 0);

      // Draw rects
      p.rect(rectW * 0.5, rectH * 0.5, r1w, r1h);
      p.rect(rectW * 1.5, rectH * 0.5, r2w, r2h);

      // Advance Waves
      wave.setSpeed(getSpeed());
      wave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};

//// FOUR BOXES

// AUDIO
export const fourBoxAudio = () => {
  const hydraSketch = boxHydra;

  const getAmpMultiplier = () => m.getSlider(6, 1, 1000);
  const getInterval = () => m.getSlider(7, 1, 200);

  const p5Sketch = (p) => {
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.5);
    const getSpeed2 = () => m.getSlider(7, 0.01, 0.5);
    const getSpeed3 = () => m.getSlider(8, 0.01, 0.5);
    const getSpeed4 = () => m.getSlider(9, 0.01, 0.5);
    const addWaves = genAddWaves(p);

    const getSpeed = () => m.getSlider(6, 0.01, 0.5);
    const amp = new a.MyAmpSplit();
    const easer1 = new Easer();
    const easer2 = new Easer();

    let wave1, wave2, wave3, wave4, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      p.rectMode(p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets

      const rectW = p.width / 2;
      const rectH = p.height / 2;

      const level1 = amp.getLevel1() * getAmpMultiplier();
      const level2 = amp.getLevel2() * getAmpMultiplier();
      easer1.tx = p.map(level1, 0, 1.5, 0, p.width / 2);
      easer1.ty = p.map(level1, 0, 1.5, 0, p.height);
      easer2.tx = p.map(level2, 0, 1.5, 0, p.width / 2);
      easer2.ty = p.map(level2, 0, 1.5, 0, p.height);

      // Draw rects
      p.rect(rectW / 2, rectH / 2, easer1.x, easer1.y);
      p.rect(rectW * 1.5, rectH / 2, easer2.x, easer2.y);
      p.rect(rectW / 2, rectH * 1.5, easer2.x, easer2.y);
      p.rect(rectW * 1.5, rectH * 1.5, easer1.x, easer1.y);

      const interval = getInterval();
      easer1.tick(Math.floor(interval));
      easer2.tick(Math.floor(interval));
    };

    p.mousePressed = () => {
      a.start();
    };
  };
  return { hydraSketch, p5Sketch };
};

// MANUAL
export const fourBox = () => {
  const hydraSketch = boxHydra;

  const p5Sketch = (p) => {
    const getSpeed1 = () => m.getSlider(6, 0.01, 0.5);
    const addWaves = genAddWaves(p);

    let wave1, wave2, wave3, wave4, modWave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave1 = new Wave(p);
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
      const r2w = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectW);
      const r2h = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectH);
      const r3w = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectW);
      const r3h = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectH);
      const r4w = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectW);
      const r4h = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, rectH);

      // Draw rects
      p.rect(rectW / 2, rectH / 2, r1w, r1h);
      p.rect(rectW * 1.5, rectH / 2, r2w, r2h);
      p.rect(rectW / 2, rectH * 1.5, r3w, r3h);
      p.rect(rectW * 1.5, rectH * 1.5, r4w, r4h);

      // Advance Waves
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const fourBoxSeparate = () => {
  const hydraSketch = boxHydra;

  const p5Sketch = (p) => {
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

//// GALAXY SKETCHES ////
const galaxyHydra = () => {
  src(s1)
    .modulate(
      osc(() => m.getSlider(3, 1, 50)),
      () => m.getSlider(3, 0, 0.1)
    )
    .modulate(noise(3), () => m.getSlider(3, 0, 0.1))
    .blend(o0)
    .contrast(1.4)
    .pixelate(
      () => m.getSlider(2, 1200, 5),
      () => m.getSlider(2, 1200, 5)
    )
    .out(o0);
};
// AUDIO
export const galaxyWithAudioInput = () => {
  const hydraSketch = galaxyHydra;

  const e = new Easer();
  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;

    let amp = new a.MyAmp();
    const getAmpMult = () => m.getSlider(6, 1, 10);
    const getInterval = () => m.getSlider(7, 1, 200);
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
      const level = amp.getLevel() * ampMult;
      e.tx = p.map(level, 0, 1.5, 0, 1000);
      const numCircles = p.map(e.x, 0, 1000, 0, 250);
      const maxRad = e.x;
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
      const interval = getInterval();
      e.tick(Math.floor(interval));
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

// MANUAL
export const galaxy = () => {
  const hydraSketch = galaxyHydra;

  const e = new Easer();
  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;

    const getSize = () => m.getSlider(6, 1, 1000);
    const getInterval = () => m.getSlider(7, 1, 100);
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
      const level = getSize();
      e.tx = level;
      const numCircles = p.map(e.x, 0, 1000, 0, 250);
      const maxRad = e.x;
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
      const interval = getInterval();
      e.tick(Math.floor(interval));
    };
  };

  return { hydraSketch, p5Sketch };
};

export const galaxyWave = () => {
  const hydraSketch = galaxyHydra;
  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;

    const getSpeed = () => m.getSlider(6, 0.01, 0.5);
    const getStrokeWeight = () => m.getSlider(8, 1, 10);
    const getXyOffset = () => m.getSlider(9, 2, 100);

    let wave;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.frameRate(frameRate);
      p.stroke(255);
      wave = new Wave(p);
    };

    p.draw = () => {
      const level = wave.val();
      const numCircles = p.map(level, -1, 1, 0, 250);
      const maxRad = p.map(level, 0, 1, 1, 1000);
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
      wave.setSpeed(getSpeed());
      wave.tick();
    };
  };

  return { hydraSketch, p5Sketch };
};

//// ROT SQUARES ////

const rotSquaresHydraRepeat = () => {
  src(s1)
    .pixelate(
      () => m.getSlider(2, 1200, 4),
      () => m.getSlider(2, 1200, 4)
    )
    .modulate(o0, () => m.getSlider(3, 0, 0.7))
    .repeatX(4)
    .repeatY(4)
    .out(o0);
};

const rotSquaresHydra = () => {
  src(s1)
    .pixelate(
      () => m.getSlider(2, 1200, 4),
      () => m.getSlider(2, 1200, 4)
    )
    .modulate(o0, () => m.getSlider(3, 0, 0.7))
    .out(o0);
};

// AUDIO
export const rotSquaresAudio = () => {
  const hydraSketch = () => {
    src(s1)
      .pixelate(
        () => m.getSlider(2, 1200, 4),
        () => m.getSlider(2, 1200, 4)
      )
      .modulate(o0, () => m.getSlider(3, 0, 0.7))
      .invert()
      .out(o0);
  };

  const p5Sketch = (p) => {
    // Parameterize these

    const maxSize = 5000;
    const numSquares = 2000; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getInterval = () => m.getSlider(6, 1, 100);
    const getRotSpeedMult = () => m.getSlider(7, 0, 100);
    const getSqMod = () => {
      const vals = [0, 3, 4, 5, 6, 7, 8, 9];
      const i = parseInt(m.getSlider(8, 0, 7));
      return vals[i];
    };
    const getAmpMultiplier = () => m.getSlider(9, 1, 1000);

    const amp = new a.MyAmp();
    const e = new Easer();
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
      const sizeMult = p.map(
        amp.getLevel() * getAmpMultiplier(),
        0,
        1,
        0.001,
        500
      );
      e.tx = sizeMult;
      sqs.forEach((sq, i) => {
        if (i % sqMod === 0) return;
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size + e.x, sq.size + e.x);
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
      e.tick(getInterval());
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

// MANUAL
export const rotSquaresBig = () => {
  const hydraSketch = rotSquaresHydra;

  const p5Sketch = (p) => {
    const maxSize = 5000;
    const numSquares = 50; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getRotSpeedMult = () => m.getSlider(6, 1, 100);

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
      sqs.forEach((sq, i) => {
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size, sq.size);
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

export const rotSquaresMed = () => {
  const hydraSketch = rotSquaresHydra;

  const p5Sketch = (p) => {
    const maxSize = 5000;
    const numSquares = 500; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getRotSpeedMult = () => m.getSlider(6, 1, 100);

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
      sqs.forEach((sq, i) => {
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size, sq.size);
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

export const rotSquaresSmall = () => {
  const hydraSketch = rotSquaresHydra;

  const p5Sketch = (p) => {
    const maxSize = 5000;
    const numSquares = 2000; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getRotSpeedMult = () => m.getSlider(6, 1, 100);

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
      sqs.forEach((sq, i) => {
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size, sq.size);
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

export const rotSquaresBigRepeat = () => {
  const hydraSketch = rotSquaresHydraRepeat;

  const p5Sketch = (p) => {
    const maxSize = 5000;
    const numSquares = 50; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getRotSpeedMult = () => m.getSlider(6, 1, 100);

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
      sqs.forEach((sq, i) => {
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size, sq.size);
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

export const rotSquaresMedRepeat = () => {
  const hydraSketch = rotSquaresHydraRepeat;

  const p5Sketch = (p) => {
    const maxSize = 5000;
    const numSquares = 500; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getRotSpeedMult = () => m.getSlider(6, 1, 100);

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
      sqs.forEach((sq, i) => {
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size, sq.size);
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

export const rotSquaresSmallRepeat = () => {
  const hydraSketch = rotSquaresHydraRepeat;

  const p5Sketch = (p) => {
    const maxSize = 5000;
    const numSquares = 2000; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

    const getRotSpeedMult = () => m.getSlider(6, 1, 100);

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
      sqs.forEach((sq, i) => {
        p.push();

        i % 2 === 0 ? p.fill(0) : 255;
        p.translate(p.width / 2, p.height / 2);
        p.rotate(sq.rot);
        p.rect(0, 0, sq.size, sq.size);
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

//// SQUARES IN SQUARES ////

const squaresInSquaresHydra = () => {
  src(s1)
    .pixelate(
      () => m.getSlider(2, 1200, 4),
      () => m.getSlider(2, 1200, 4)
    )
    .modulate(o0, () => m.getSlider(3, 0, 0.7))
    .out(o0);
};

// AUDIO

export const squaresInSquaresAudioSize = () => {
  const hydraSketch = squaresInSquaresHydra;

  const getAmpMult = () => m.getSlider(6, 0.1, 10);
  const getTriggerInterval = () => parseInt(m.getSlider(7, 100, 10));
  const getInterval = () => m.getSlider(8, 200, 2000);
  const getInterval2 = () => m.getSlider(9, 1, 100);

  const p5Sketch = (p) => {
    const cols = 1;
    const rows = 1;
    const numRects = 100;

    let rects;
    const amp = new a.MyAmp();
    const e = new Easer();
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
      e.tx = level;
      rects.forEach((row) => row.forEach((rect) => (rect.numRects = e.x)));
      const interval2 = getInterval2();
      e.tick(interval2);
    };
    p.mousePressed = () => {
      a.start();
    };
  };

  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresAudioTrigger = () => {
  const hydraSketch = squaresInSquaresHydra;
  const getTriggerLevel = () => m.getSlider(6, 0.1, 0.7);
  const getMaxMovement = () => m.getSlider(7, 1, 20);
  const p5Sketch = (p) => {
    const cols = 1;
    const rows = 1;
    const numRects = 100;
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
      const maxMovement = getMaxMovement();
      rects.forEach((row) =>
        row.forEach((rect) =>
          rect.setOffset(
            p.random(-maxMovement, maxMovement),
            p.random(-maxMovement, maxMovement)
          )
        )
      );
    };

    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) => row.forEach((rect) => rect.tick(interval / 60)));

      const level = amp.getLevel();
      if (level > getTriggerLevel()) {
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
  const hydraSketch = squaresInSquaresHydra;
  const getTriggerLevel = () => m.getSlider(6, 0.1, 0.7);
  const getMaxMovement = () => m.getSlider(7, 1, 20);
  const p5Sketch = (p) => {
    const cols = 2;
    const rows = 2;
    const numRects = 35;
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
      const maxMovement = getMaxMovement();
      rects.forEach((row) =>
        row.forEach((rect) =>
          rect.setOffset(
            p.random(-maxMovement, maxMovement),
            p.random(-maxMovement, maxMovement)
          )
        )
      );
    };

    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) => row.forEach((rect) => rect.tick(interval / 60)));

      const level = amp.getLevel();
      if (level > getTriggerLevel()) {
        triggerMovement();
      }
    };
    p.mousePressed = () => {
      a.start();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresAudioTrigger16 = () => {
  const hydraSketch = squaresInSquaresHydra;
  const getTriggerLevel = () => m.getSlider(6, 0.1, 0.7);
  const getMaxMovement = () => m.getSlider(7, 1, 20);
  const p5Sketch = (p) => {
    const cols = 4;
    const rows = 4;
    const numRects = 20;
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
      const maxMovement = getMaxMovement();
      rects.forEach((row) =>
        row.forEach((rect) =>
          rect.setOffset(
            p.random(-maxMovement, maxMovement),
            p.random(-maxMovement, maxMovement)
          )
        )
      );
    };

    p.draw = () => {
      p.background(0);
      rects.forEach((row) => row.forEach((rect) => rect.draw()));
      rects.forEach((row) => row.forEach((rect) => rect.tick(interval / 60)));

      const level = amp.getLevel();
      if (level > getTriggerLevel()) {
        triggerMovement();
      }
    };
    p.mousePressed = () => {
      a.start();
    };
  };
  return { hydraSketch, p5Sketch };
};

// MANUAL
export const squaresInSquares = () => {
  const hydraSketch = squaresInSquaresHydra;

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

//// MOIRE CIRCLES ////

const moireCirclesHydra = () => {
  src(s1)
    .pixelate(
      () => m.getSlider(2, 1200, 4),
      () => m.getSlider(2, 1200, 4)
    )
    .modulate(o0, () => m.getSlider(3, 0, 0.7))
    .out(o0);
};

export const moireCircles2 = () => {
  // This one has the circles moving on timer
  const hydraSketch = moireCirclesHydra;

  const p5Sketch = (p) => {
    const maxCircles = 150;
    const maxRad = 3000;
    const circleCount = 2;
    const getTriggerInterval = () => m.getSlider(7, 10, 200);

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
      if (p.frameCount % getTriggerInterval() === 0) {
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

export const moireCircles4 = () => {
  // This one has the circles moving on timer
  const hydraSketch = moireCirclesHydra;

  const p5Sketch = (p) => {
    const maxCircles = 80;
    const maxRad = 3000;
    const circleCount = 4;
    const getTriggerInterval = () => m.getSlider(7, 10, 200);

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
      if (p.frameCount % getTriggerInterval() === 0) {
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

//// FEEDBACK SKETCHES ////

export const galaxyVideoInput = () => {
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
