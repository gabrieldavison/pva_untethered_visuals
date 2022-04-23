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
class MyAmp {
  constructor(p5, p) {
    this.p5 = p5;
    this.p = p;
    this.mic = new this.p5.AudioIn();
    this.mic.start();
    this.amp = new this.p5.Amplitude();
  }
  start() {
    this.p.userStartAudio();
    this.amp.setInput(this.mic);
  }
  getLevel() {
    return this.amp.getLevel();
  }
}
class MyRect {
  constructor(p, x, y, maxWidth, maxHeight, numRects) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.numRects = numRects;
    this.chunkW = maxWidth / numRects;
    this.chunkH = maxHeight / numRects;
    this.offsetX = 0;
    this.offsetY = 0;
    this.targetOffsetX = 0;
    this.targetOffsetY = 0;
  }
  draw() {
    for (let i = 0; i < this.numRects; i++) {
      this.p.push();
      this.p.translate(this.x, this.y);
      for (let i = 0; i < this.numRects; i++) {
        const w = this.chunkW * (i + 1);
        const h = this.chunkH * (i + 1);
        const offsetMult = this.p.map(i, 0, this.numRects, this.numRects, 0);
        this.p.rect(
          0 + offsetMult * this.offsetX,
          0 + offsetMult * this.offsetY,
          w,
          h
        );
      }
      this.p.pop();
    }
  }
  setOffset(x, y) {
    this.targetOffsetX = x;
    this.targetOffsetY = y;
  }
  tick(interval) {
    const dx = (this.targetOffsetX - this.offsetX) / interval;
    const dy = (this.targetOffsetY - this.offsetY) / interval;
    console.log(dx, dy);
    this.offsetX += dx;
    this.offsetY += dy;
  }
}
class myCircle {
  constructor(p, x, y, maxRad, numCircles) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.tX = x;
    this.tY = y;
    this.maxRad = maxRad;
    this.numCircles = numCircles;
    this.chunk = maxRad / numCircles;
  }

  draw() {
    this.p.push();
    this.p.translate(this.x, this.y);
    for (let i = 0; i < this.numCircles; i++) {
      const s = this.chunk * (i + 1);
      this.p.circle(0, 0, s);
    }
    this.p.pop();
  }
  move(x, y) {
    this.tX = x;
    this.tY = y;
  }
  tick(interval) {
    const dx = (this.tX - this.x) / interval;
    const dy = (this.tY - this.y) / interval;

    this.x += dx;
    this.y += dy;
  }
}

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
    // Parameterize these

    const maxSize = 1500;
    const numSquares = 1000; // Up to 5000 looks nice
    const rotSpeedMin = 0.0005; // can go up and down in factors of 10 but try and keep a big gap between them
    const rotSpeedMax = 0.001;

    let sqs;
    let genSquares;

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

        i % 2 === 0
          ? (sqs[i].rot += p.random(rotSpeedMin, rotSpeedMax))
          : (sqs[i].rot += p.random(-rotSpeedMax, -rotSpeedMin));
      });
    };
  };

  return { hydraSketch, p5Sketch };
};

export const galaxy = () => {
  const hydraSketch = () => {
    // src(s1).modulate(noise(10), 0.1).out(o0);
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.frameRate(frameRate);
      p.noStroke();
    };
    p.draw = () => {
      const numCircles = p.mouseX;
      const maxRad = p.mouseX;
      const inc = maxRad / numCircles;
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      for (let i = 0; i < numCircles; i++) {
        for (let j = 0; j < numPoints; j++) {
          const rad = (i + 1) * inc;
          const a = p.random() * 2 * p.PI;
          const r = rad * p.sqrt(p.random());
          const x = r * p.cos(a);
          const y = r * p.sin(a);
          p.square(x, y, 3);
        }
      }
    };
  };

  return { hydraSketch, p5Sketch };
};

export const galaxyWithAudioInput = () => {
  const hydraSketch = () => {
    src(s1).modulate(noise(10), 0.1).out(o0);
    // src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const numPoints = 10;
    const frameRate = 280;
    const ampMult = 5;
    let mic, amp;
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("p5-canvas");
      hydraInit(p);
      p.frameRate(frameRate);
      p.noStroke();
      mic = new p5.AudioIn();
      mic.start();
      amp = new p5.Amplitude();
    };
    p.draw = () => {
      const numCircles = p.map(
        amp.getLevel() * ampMult,
        0,
        1 * ampMult,
        50,
        1000
      );
      const maxRad = p.map(amp.getLevel() * ampMult, 0, 1 * ampMult, 50, 1000);
      const inc = maxRad / numCircles;
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      for (let i = 0; i < numCircles; i++) {
        for (let j = 0; j < numPoints; j++) {
          const rad = (i + 1) * inc;
          const a = p.random() * 2 * p.PI;
          const r = rad * p.sqrt(p.random());
          const x = r * p.cos(a);
          const y = r * p.sin(a);
          p.square(x, y, 3);
        }
      }
    };
    p.mousePressed = () => {
      p.userStartAudio();
      amp.setInput(mic);
    };
  };

  return { hydraSketch, p5Sketch };
};

export const moireCircles = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const numCircles = 3;
    const maxRad = 800;
    const circleCount = 10;

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
            numCircles
          )
      );
      p.stroke(255);
      p.strokeWeight(4);
    };

    p.draw = () => {
      p.background(0);
      circles.forEach((c) => c.draw());
      circles.forEach((c) => c.tick(3000 / 60));
    };

    p.mousePressed = () => {
      circles.forEach((c) =>
        c.move(p.random(0, p.width), p.random(0, p.height))
      );
    };
  };

  return { hydraSketch, p5Sketch };
};

export const moireCirclesWithAudioInput = () => {
  const hydraSketch = () => {
    src(s1).out(o0);
  };

  const p5Sketch = (p) => {
    const numCircles = 3; //num circles inside each circle
    const maxRad = 800;
    const circleCount = 10; // num big circles
    const thresh = 0.1;

    let circles;
    let mic, amp;
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
            numCircles
          )
      );
      p.stroke(255);
      p.strokeWeight(4);

      mic = new p5.AudioIn();
      mic.start();
      amp = new p5.Amplitude();
    };

    p.draw = () => {
      p.background(0);
      const level = amp.getLevel();
      console.log(level);
      if (level > thresh)
        circles.forEach((c) =>
          c.move(p.random(0, p.width), p.random(0, p.height))
        );
      circles.forEach((c) => c.draw());
      circles.forEach((c) => c.tick(3000 / 60));
    };

    p.mousePressed = () => {
      p.userStartAudio();
      amp.setInput(mic);
    };
  };

  return { hydraSketch, p5Sketch };
};

export const squaresInSquares = () => {
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
      rects.forEach((row) => row.forEach((rect) => rect.tick(interval / 60)));
      if (p.frameCount % triggerInterval === 0) {
        rects.forEach((row) =>
          row.forEach((rect) =>
            rect.setOffset(p.random(-5, 5), p.random(-5, 5))
          )
        );
      }
    };
    p.mousePressed = () => {
      rects.forEach((row) =>
        row.forEach((rect) =>
          rect.setOffset(
            p.random(-maxMovement, maxMovement),
            p.random(-maxMovement, maxMovement)
          )
        )
      );
    };
  };

  return { hydraSketch, p5Sketch };
};

export const squaresInSquaresAudioInput = () => {
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
    let amp;
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
      amp = new MyAmp(p5, p);
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
      // if (p.frameCount % triggerInterval === 0) {
      //   triggerMovement();
      // }
      const level = amp.getLevel();
      if (level > 0.1) {
        triggerMovement();
      }
    };
    p.mousePressed = () => {
      console.log(amp);
      amp.start();
    };
  };
  return { hydraSketch, p5Sketch };
};
