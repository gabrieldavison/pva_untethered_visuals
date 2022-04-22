// Templates

const hydraInit = (p) => {
  p.pixelDensity(1);
};

export const init = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
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

export const audioInit = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    let fft, mic;
    p.setup = () => {
      // Sets up Mic
      mic = new p5.AudioIn();
      mic.start();
      // Lists sources
      // mic.getSources((s) => console.log(s));
      // Switching between source 1 and source 0 switches between left and right channels
      // mic.setSource(1);

      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);

      fft = new p5.FFT();
      fft.setInput(mic);

      p.noFill();
      p.background(50);
    };

    p.draw = () => {
      p.background(200);
      let spectrum = fft.analyze();
      p.beginShape();
      for (let i = 0; i < spectrum.length; i++) {
        p.vertex(i, p.map(spectrum[i], 0, 255, p.height, 0));
      }
      p.endShape();
    };

    // Remember to manually start audio
    p.mousePressed = () => {
      p.userStartAudio();
    };
  };

  return { hydraSketch, p5Sketch };
};

export const template = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
    };
    p.draw = () => {};
  };

  return { hydraSketch, p5Sketch };
};

/// Helpers ///

class Wave {
  constructor(p, initSpeed = 0.05) {
    this.p = p;
    this.clock = 0.0;
    this.speed = 0.05;
  }
  val() {
    return this.p.sin(this.clock);
  }
  setSpeed(v) {
    this.speed = v;
  }
  tick() {
    this.clock += this.speed;
  }
}

const genAddWaves =
  (p) =>
  (w1, w2, attenuator = 1) =>
    p.map(
      w1.val() + p.map(w2.val(), -1, 1, -1 * attenuator, 1 * attenuator),
      -1 - attenuator * 1,
      1 + attenuator * 1,
      -1,
      1
    );

//// SCRATCH ////

/////////////////// BOX SCENES ///////////////////
export const oneBoxWithAudioControl = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const getSpeed2 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const addWaves = genAddWaves(p);

    let wave1, modWave;

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
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const level = amp.getLevel();
      const w1Offset = p.map(level, 0, 1.5, p.width, 0);
      const h1Offset = p.map(level, 0, 1.5, p.height, 0);

      // Draw rects
      p.rect(
        0 + w1Offset,
        0 + h1Offset,
        // Need to swap this out to go from 0 -> w1 offset, need to do some more mapping
        p.width - w1Offset * 2,
        p.height - h1Offset * 2
      );
    };
    p.mousePressed = () => {
      p.userStartAudio();
      amp.setInput(mic);
    };
  };

  return { hydraSketch, p5Sketch };
};

export const oneBoxWithSpeedControl = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const getSpeed2 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const addWaves = genAddWaves(p);

    let wave1, modWave;

    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.fill(0);
      wave1 = new Wave(p);
      modWave = new Wave(p, 0.1);
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const w1Offset = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, p.width);
      const h1Offset = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, p.height);

      // Draw rects
      p.rect(
        0 + w1Offset,
        0 + h1Offset,
        p.width - w1Offset * 2,
        p.height - h1Offset * 2
      );

      // Advance Waves
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const twoBoxWithSpeedControl = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const getSpeed2 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
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
        addWaves(wave1, modWave, 0),
        -1,
        1,
        0,
        p.width / 2
      );
      const h1Offset = p.map(addWaves(wave1, modWave, 0), -1, 1, 0, p.height);
      const w2Offset = p.map(
        addWaves(wave2, modWave, 0),
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
      wave1.setSpeed(getSpeed1());
      wave1.tick();
      wave2.setSpeed(getSpeed2());
      wave2.tick();
      modWave.tick();
    };
  };
  return { hydraSketch, p5Sketch };
};

export const fourBoxWithSpeedControl = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    // Swap these out for midi functions
    const getSpeed1 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const getSpeed2 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const getSpeed3 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
    const getSpeed4 = () => p.map(p.mouseX, 0, p.width, 0.01, 0.3);
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
    };

    p.draw = () => {
      p.background(255);

      // Set up offsets
      const w1Offset = p.map(
        addWaves(wave1, modWave, 0),
        -1,
        1,
        0,
        p.width / 2
      );
      const h1Offset = p.map(
        addWaves(wave1, modWave, 0),
        -1,
        1,
        0,
        p.height / 2
      );
      const w2Offset = p.map(
        addWaves(wave2, modWave, 0),
        -1,
        1,
        0,
        p.width / 2
      );
      const h2Offset = p.map(
        addWaves(wave2, modWave, 0),
        -1,
        1,
        0,
        p.height / 2
      );

      const w3Offset = p.map(
        addWaves(wave3, modWave, 0),
        -1,
        1,
        0,
        p.width / 2
      );
      const h3Offset = p.map(
        addWaves(wave3, modWave, 0),
        -1,
        1,
        0,
        p.height / 2
      );

      const w4Offset = p.map(
        addWaves(wave4, modWave, 0),
        -1,
        1,
        0,
        p.width / 2
      );
      const h4Offset = p.map(
        addWaves(wave4, modWave, 0),
        -1,
        1,
        0,
        p.height / 2
      );

      // Draw rects
      p.rect(
        0 + w1Offset,
        0 + h1Offset,
        p.width / 2 - w1Offset * 2,
        p.height / 2 - h1Offset * 2
      );
      p.rect(
        p.width / 2 + w2Offset,
        p.height / 2 + h2Offset,
        p.width / 2 - w2Offset * 2,
        p.height / 2 - h2Offset * 2
      );
      p.rect(
        0 + w2Offset,
        p.height / 2 + h3Offset,
        p.width / 2 - w3Offset * 2,
        p.height / 2 - h3Offset * 2
      );
      p.rect(
        p.width / 2 + w4Offset,
        0 + h4Offset,
        p.width / 2 - w4Offset * 2,
        p.height / 2 - h4Offset * 2
      );

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

export const rotatingSquares = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const genSquares = (maxSize, num) => {
      const chunk = maxSize / num;
      const r = (acc, _v, i) => {
        const size = (i + 1) * chunk;
        const x = maxSize / 2 - 0.5 * size;
        const y = maxSize / 2 - 0.5 * size;
        return [...acc, { size, x, y, rot: 0.1 }];
      };
      return [...Array(num)].reduce(r, []);
    };
    const maxSize = 800;
    let sqs = genSquares(maxSize, 10).reverse();
    const offSet = maxSize / 2;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
    };

    p.draw = () => {
      p.push();
      p.translate(p.width / 2 - 7, p.height / 2 - offSet);
      sqs.forEach((sq, i) => {
        p.push();
        /// Not translating into correct place to rotate
        p.translate(0.5 * sq.size, 0.5 * sq.size);
        p.rotate(sq.rot * p.PI);
        p.square(sq.x, sq.y, sq.size);
        p.pop();
      });
      p.pop();
    };
  };

  return { hydraSketch, p5Sketch };
};
